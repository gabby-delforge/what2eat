import sqlalchemy
import cockroachdb
import random
from . import schema
from .schema import Base
from sqlalchemy import create_engine



class Service():

    def __init__(self):
        self.engine = create_engine(
                                    'cockroachdb://super@localhost:26257/what2eat',
                                    connect_args={'sslmode': 'disable'},
                                    echo=True                   # Log SQL queries to stdout
                                )

        Base.metadata.create_all(engine)

    def createEvent(self, eventName, eventDateTime, location):
        UID = random.getrandbits(128)
        run_transaction(sessionmaker(bind=self.engine), lambda s: self._createEvent(s, eventName, eventDateTime, location))
        return UID

    # Creates an event
    def _createEvent(self, sess, eventName, eventDateTime, location):
        sess.add(Event(uid=UID, name=eventName, location=location))

    def login(self, username):


#Creators added during event page creation, and invitees are added during sign in on shareable link
def addUser(sess, name, eventUID, creator):
    #Check if user exists
    result = sess.execute("SELECT UID FROM users WHERE name=:name AND eventUID:=eventUID",
                          {"name": name, "eventUID": eventUID})
    print(result)
    #This could be a result != null. Idk what result looks like
    if len(result) == 0:
        #User doesn't exist, so add the user
        sess.add(User(name=name, eventUID=eventUID, creator=creator))
        #Get the autogenerated UID
        result = sess.execute("SELECT UID FROM users WHERE name=:name", {"name": name})
        return result
    else:
        return result


#Delete all exisiting votes, then add vote to restaurant_votes
def voteRestaurant(sess, userID, yelpID):
    sess.execute("DELETE FROM restaurant_votes WHERE user_ID=:UserID", {"UserID":userID})
    sess.execute("SELECT id FROM restaurant_options WHERE yelp_id=:name AND eventUID:=eventUID")
    sess.add(RestaurantVote(user_ID=userID, restaurantID=restaurantID))

#
def addRestaurant(sess, eventID, yelpID):
    sess.add(RestaurantOption(event_id=eventID, yelpID=yelpID))
