import sqlalchemy
import cockroachdb
import random
from . import schema

#
def createEvent(sess, eventName, eventDateTime, location):
    UID = random.getrandbits(128)

    sess.add(Event(uid=UID, name=eventName, location=location))

#Creators added during event page creation, and invitees are added during sign in on shareable link
def addUser(sess, name, eventUID, creator):
    #Check if user exists
    result = sess.execute("SELECT UID FROM users WHERE name=:name AND eventUID:=eventUID",
                          {"name": name, "eventUID": eventUID})

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


