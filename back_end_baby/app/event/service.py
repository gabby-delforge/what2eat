from sqlalchemy.orm import sessionmaker
from cockroachdb.sqlalchemy import run_transaction
import random
import schema
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
        run_transaction(self.sessMaker, lambda s: self._createEvent(s, UID, eventName, eventDateTime, location))
        return UID

    # Creates an event
    def _createEvent(self, sess, uid, eventName, eventDateTime, location):
        sess.add(schema.Event(id=uid, name=eventName, location=location))
        sess.add(schema.TimeOption(event_id=uid, timestamp=eventDateTime))

    def getEvent(self, eventName):
        ret = self.sess.execute("SELECT name FROM events").fetchall()
        # placeholder = self.sess.execute("SELECT * FROM time_options").fetchall()
        # print(placeholder)
        print(ret)

    # def login(self, username, eventID, creator):
    #     # Check if user exists
    #     uid = self.sess.execute("SELECT UID FROM users WHERE name=:name AND eventUID:=eventUID",
    #                           {"name": username, "eventUID": eventID})
    #     print(uid)
    #     # This could be a result != null. Idk what result looks like
    #     if len(uid) == 0:
    #         #User doesn't exist, so we add the user to database
    #         run_transaction(self.sess, lambda s: self._login(username, eventID, creator))
    #         uid = self.sess.execute("SELECT UID FROM users WHERE name=:name", {"name": username})
    #
    #     return uid
    #
    #
    # def _login(self, username, eventID, creator):
    #     self.sess.add(schema.User(name=username, eventUID=eventID, creator=creator))
    #     # Get the autogenerated UID
    #     result = self.sess.execute("SELECT UID FROM users WHERE name=:name", {"name": username})
    #     return result
    #
    # def addRestaurant(self, eventID, yelpID):
    #     exists = self.sess.execute("SELECT yelpID FROM users WHERE yelpID=:yelpID and eventID=:eventID",
    #                                {"yelpID": yelpID, "eventID": eventID})
    #     if len(exists) == 0:
    #         run_transaction(self.sess, lambda s: self._addRestaurant(username, eventID, creator))
    #
    #
    #
    # def _addRestaurant(self, eventID, yelpID):
    #     self.sess.add(schema.RestaurantOption(event_id=eventID, yelpID=yelpID))
    #
    # def voteRestaurant(self, userID, yelpID)
    #     restaurants = self.sess.query(schema.RestaurantVote).filter(schema.RestaurantVote.id==userID)
    #     self.sess.expungeAll(restaurants)
    #     self.sess.add(schema.RestaurantVote())
    #
    #
    #
    #     sess.execute("DELETE FROM restaurant_votes WHERE user_ID=:UserID", {"UserID":userID})
    #     sess.execute("SELECT id FROM restaurant_options WHERE yelp_id=:name AND eventUID:=eventUID")

serviceObj = Service()
print(serviceObj.sess)
print("Output of createEvent1: ", serviceObj.createEvent("CalHacks5", datetime.datetime.now(), "Berkeley"))
print("Output of createEvent2: ",serviceObj.createEvent("CalHacks6", datetime.datetime.now(), "Berkeley"))
print("Output of getEvent: ", serviceObj.getEvent("CalHacks5"))
#
#
# #Delete all exisiting votes, then add vote to restaurant_votes
# def voteRestaurant(sess, userID, yelpID):
#     sess.execute("DELETE FROM restaurant_votes WHERE user_ID=:UserID", {"UserID":userID})
#     sess.execute("SELECT id FROM restaurant_options WHERE yelp_id=:name AND eventUID:=eventUID")
#     sess.add(RestaurantVote(user_ID=userID, restaurantID=restaurantID))
#
# #
# def addRestaurant(sess, eventID, yelpID):
#     self.sess.add(RestaurantOption(event_id=eventID, yelpID=yelpID))
