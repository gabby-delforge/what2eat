from sqlalchemy.orm import sessionmaker
from cockroachdb.sqlalchemy import run_transaction
import random
import schema
import time
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
        UID = random.randint(0, 1000)
        run_transaction(self.sessMaker, lambda s: self._createEvent(s, UID, eventName, location))
        self.sess.commit()
        run_transaction(self.sessMaker, lambda s: self._addTimeOption(s, UID, eventDateTime))
        self.sess.commit()
        return UID

    # Creates an event
    def _createEvent(self, sess, id, eventName, location):
        sess.add(schema.Event(id=id, name=eventName, location=location))

    def _addTimeOption(self, sess, id, eventDateTime):
        sess.add(schema.TimeOption(event_id=id, timestamp=eventDateTime))

    def getEvent(self, eventName):
        ret = self.sess.execute("SELECT * FROM events").fetchone()
        placeholder = self.sess.execute("SELECT * FROM time_options").fetchall()

    def login(self, username, eventID, creator):
        # Check if user exists
        uid = self.sess.execute("SELECT id FROM users WHERE username=:name AND event_id=:eventID",
                              {"name": username, "eventID": eventID}).fetchone()
        # This could be a result != null. Idk what result looks like
        if uid is None:
            #User doesn't exist, so we add the user to database
            run_transaction(self.sessMaker, lambda s: self._login(s, username, eventID, creator))
            self.sess.commit()
            uid = self.sess.execute("SELECT id FROM users WHERE username=:name AND event_id=:eventID",
                              {"name": username, "eventID": eventID}).fetchone()

        return uid[0]


    def _login(self, sess, username, eventID, creator):
        sess.add(schema.User(username=username, event_id=eventID, creator=creator))

    def addRestaurant(self, eventID, yelpID):
        exists = self.sess.execute("SELECT yelp_id FROM restaurant_options WHERE yelp_id=:yelpID and event_id=:eventID",
                                   {"yelpID": yelpID, "eventID": eventID}).fetchone()
        if exists is None:
            run_transaction(self.sessMaker, lambda s: self._addRestaurant(s, eventID, yelpID))
            self.sess.commit()



    def _addRestaurant(self, sess, eventID, yelpID):
        sess.add(schema.RestaurantOption(event_id=eventID, yelp_id=yelpID))

    def getRestaurantID(self, yelpID, eventID):
        result = self.sess.execute("SELECT id from restaurant_options WHERE yelp_id=:yelpID and event_id=:eventID", {"yelpID": yelpID, "eventID": eventID}).fetchone()
        if result is None:
            return None
        return result[0]

    def voteRestaurant(self, userID, yelpID, eventID):
        #Check if restaurant exists
        restaurantID = self.getRestaurantID(yelpID, eventID)
        restaurants = self.sess.query(schema.RestaurantVote).filter(
            schema.RestaurantVote.user_id == userID).all()
        #Delete previous vote and then add new vote
        run_transaction(self.sessMaker, lambda s: self._deleteExistingRestaurants(restaurants))
        self.sess.commit()
        run_transaction(self.sessMaker, lambda s: self._addVote(s, userID, restaurantID))
        self.sess.commit()


    def _addVote(self, sess, userID, optionID):
        sess.add(schema.RestaurantVote(user_id=userID, option_id=optionID))

    def _deleteExistingRestaurants(self, restaurantOptions):
        for restaurant in restaurantOptions:
            self.sess.delete(restaurant)

    def datetimeToMs(self, dt):
        epoch = datetime.datetime.utcfromtimestamp(0)
        return (dt - epoch).total_seconds() * 1000.0

    def eventInfo(self, eventID):
        result = self.sess.execute("SELECT events.name, time_options.timestamp FROM events, time_options WHERE events.id=:eventID and events.id=time_options.event_id ",
                                   {"eventID": eventID}).fetchone()
        if result is None:
            return None
        return result[0], int(self.datetimeToMs(result[1]))

    def getVotedRestaurants(self, userID, eventID):
        result = self.sess.execute("SELECT ro.yelp_id from restaurant_options as ro, restaurant_votes as rv"
                                   " WHERE rv.user_id=:userID and ro.id=rv.option_id and ro.event_id=:eventID",
                                   {"userID": userID, "eventID": eventID}).fetchall()
        return result

    def getResults(self, eventID):
        ids = self.sess.execute("SELECT id, yelp_id from restaurant_options where event_id=:eventID", {"eventID": eventID}).fetchall()
        results = []
        for id in ids:
            votes = self.sess.execute("SELECT id from restaurant_votes as rv"
                                       " WHERE option_id=:restID",
                                       {"restID": id[0], "eventID": eventID}).fetchall()
            print("getResults votes: ", votes)
            result = (id[1], len(votes))
            results.append(result)
        results.sort(key = lambda x: x[1])
        return results

serviceObj = Service()

# print("Creating CalHacks7: ")
# eventID = serviceObj.createEvent("CalHacks7", datetime.datetime.now(), "Berkeley")
# print("EventID: ", eventID)
# print("Adding User1: ")
# UID1 = serviceObj.login("User1", eventID, True)
# print("UID of user1: ", UID1)
# UID2 = serviceObj.login("User2", eventID, False)
# print("UID of user2: ", UID2)
# UID3 = serviceObj.login("User3", eventID, False)
# print("UID of user3: ", UID3)
# serviceObj.addRestaurant(eventID, "Chum Bucket")
# serviceObj.addRestaurant(eventID, "Krusty Krab")
# serviceObj.addRestaurant(eventID, "Krusty Krab")
# serviceObj.addRestaurant(eventID, "Gusteau's")
# serviceObj.voteRestaurant(UID1, "Chum Bucket", eventID)
# serviceObj.voteRestaurant(UID2, "Chum Bucket", eventID)
# serviceObj.voteRestaurant(UID3, "Krusty Krab", eventID)
# results = serviceObj.getResults(eventID)
# print("Results: ", results)
# print("getResults works: ", results == [("Gusteau's", 0),("Krusty Krab", 1), ("Chum Bucket", 2)])
# print("Should be Chum Bucket", serviceObj.getVotedRestaurants(UID1, eventID))
# serviceObj.voteRestaurant(UID1, "Gusteau's", eventID)
# serviceObj.voteRestaurant(UID1, "Gusteau's", eventID)
# serviceObj.voteRestaurant(UID1, "Gusteau's", eventID)
# serviceObj.voteRestaurant(UID1, "Gusteau's", eventID)
# serviceObj.voteRestaurant(UID1, "Gusteau's", eventID)
# serviceObj.voteRestaurant(UID1, "Gusteau's", eventID)
# print("all 1 vote", serviceObj.getResults(eventID))

