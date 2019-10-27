from sqlalchemy.orm import sessionmaker
from cockroachdb.sqlalchemy import run_transaction
import random
import schema
# import schema
from sqlalchemy import create_engine
import datetime



class Service():

    def __init__(self):
        self.engine = create_engine(
                                    'cockroachdb://super@localhost:26257/what2eat',
                                    connect_args={'sslmode': 'disable'},
                                    echo=True                   # Log SQL queries to stdout
                                )

        schema.Base.metadata.create_all(self.engine)
        self.sessMaker = sessionmaker(bind=self.engine)
        self.sess = self.sessMaker()

    def createEvent(self, eventName, eventDateTime, location):
        UID = random.getrandbits(63)
        run_transaction(self.sessMaker, lambda s: self._createEvent(s, UID, eventName, location))
        run_transaction(self.sessMaker, lambda s: self._addTimeOption(s, UID, eventDateTime))
        return UID

    # Creates an event
    def _createEvent(self, sess, id, eventName, location):
        sess.add(schema.Event(id=id, name=eventName, location=location))

    def _addTimeOption(self, sess, id, eventDateTime):
        sess.add(schema.TimeOption(event_id=id, timestamp=eventDateTime))

    def getEvent(self, eventName):
        ret = self.sess.execute("SELECT * FROM events").fetchone()
        placeholder = self.sess.execute("SELECT * FROM time_options").fetchall()
        print("time_options: ", placeholder)
        print("events: ", ret)

    def login(self, username, eventID, creator):
        # Check if user exists
        uid = self.sess.execute("SELECT id FROM users WHERE name=:name AND eventUID=:eventUID",
                              {"name": username, "eventUID": eventID}).fetchone()
        print(uid)
        # This could be a result != null. Idk what result looks like
        if uid is None:
            #User doesn't exist, so we add the user to database
            run_transaction(self.sessMaker, lambda s: self._login(username, eventID, creator))
            uid = self.sess.execute("SELECT id FROM users WHERE name=:name", {"name": username}).fetchone()

        return uid[0]


    def _login(self, username, eventID, creator):
        self.sess.add(schema.User(name=username, eventUID=eventID, creator=creator))

    def addRestaurant(self, eventID, yelpID):
        # exists = self.sess.execute("SELECT yelp_id FROM restaurant_options").fetchall()
        exists = self.sess.execute("SELECT yelp_id FROM restaurant_options WHERE yelp_id=:yelpID and event_id=:eventID",
                                   {"yelpID": yelpID, "eventID": eventID}).fetchone()
        print("exists in add_Restaurant: ", exists)
        if exists is None:
            run_transaction(self.sessMaker, lambda s: self._addRestaurant(s, eventID, yelpID))
        else:
            print("restaurant exists")



    def _addRestaurant(self, sess, eventID, yelpID):
        sess.add(schema.RestaurantOption(event_id=eventID, yelp_id=yelpID))
        print("Adding restaurant was successful")

    def getRestaurantID(self, yelpID, eventID):
        result = self.sess.execute("SELECT id from restaurant_options WHERE yelp_id=:yelpID and event_id=:eventID", {"yelpID": yelpID, "eventID": eventID})
        if result is None:
            return None
        return result[0]

    def voteRestaurant(self, userID, yelpID, eventID):
        #Check if restaurant exists
        restaurantID = self.getRestaurantID(yelpID, eventID)
        if restaurantID is None:
            #Add vote
            run_transaction(self.sessMaker, lambda s: self._addVote(s, userID, restaurantID))
        else:
            #Delete previous vote and then add new vote
            run_transaction(self.sessMaker, lambda s: self._deleteExistingRestaurants(s, restaurants))
            run_transaction(self.sessMaker, lambda s: self._addVote(s, userID, restaurantID))
        restaurants = self.sess.query(schema.RestaurantVote).filter(schema.RestaurantVote.id==userID and schema.RestaurantVote)
        run_transaction(self.sessMaker, lambda s: self._deleteExistingRestaurants(s, restaurants))

    def _addVote(self, id, userID, optionID):
        self.sess.add(schema.RestaurantVote(id=id, user_id=userID, option_id=optionID))

    def _deleteExistingRestaurants(self, sess, restaurantOptions):
        for restaurant in restaurantOptions:
            sess.expunge(restaurant)

    def datetimeToMs(self, dt):
        epoch = datetime.datetime.utcfromtimestamp(0)
        return (dt - epoch).total_seconds() * 1000.0

    def eventInfo(self, eventID):
        result = self.sess.execute("SELECT events.name, time_options.timestamp FROM events, time_options WHERE events.id=:eventID and events.id=time_options.event_id ",
                                   {"eventID": eventID}).fetchone()
        if result is None:
            print("Event does not exist")
            return None
        return result[0], int(self.datetimeToMs(result[1]))

    def getVotedRestaurants(self, userID, eventID):
        result = self.sess.execute("SELECT ro.yelp_id from restaurant_options as ro, restaurant_votes as rv"
                                   " WHERE rv.user_id=:userID and ro.id=rv.option_id and ro.event_id=:eventID)",
                                   {"userID": userID, "eventID": eventID}).fetchall()
        return result

    def getResults(self, eventID):
        ids = self.sess.execute("SELECT id, yelp_id from restaurant_options where event_id=:eventID", {"eventID": eventID}).fetchall()
        results = []
        for id in ids:
            votes = self.sess.execute("SELECT ro.yelp_id from restaurant_options as ro, restaurant_votes as rv"
                                       " WHERE rv.option_id=:restID and ro.event_id=:eventID)",
                                       {"restID": id[0], "eventID": eventID}).fetchall()
            result = (id[1], len(votes))
            results.append(result)
        return results



serviceObj = Service()



print("All events", serviceObj.sess.execute("Select id, name from events").fetchall())
print("Event info:", serviceObj.eventInfo(8441023917761369310))
# results = serviceObj.sess.query(schema.Event).filter(schema.Event.name=="CalHacks5")
# print(results)
# for result in results:
#     print("Result: ", result.id)

# print(serviceObj.sess.execute("SELECT event_id from events").fetchone())
# serviceObj.getEvent("CalHacks5")
# print("Output of addRestaurant: ", serviceObj.addRestaurant(84410239177613693102321, "arbitrary_id"))
# print("Output of createEvent2: ",serviceObj.createEvent("CalHacks6", datetime.datetime.now(), "Berkeley"))
# print("Output of getEvent: ", serviceObj.getEvent("CalHacks5"))
# print("Output of createEvent1: ", serviceObj.createEvent("CalHacks5", datetime.datetime.now(), "Berkeley"))
# print("Output of createEvent2: ",serviceObj.createEvent("CalHacks6", datetime.datetime.now(), "Berkeley"))
# print("Output of getEvent: ", serviceObj.getEvent("CalHacks5"))
