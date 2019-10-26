from marshmallow import Schema, fields

class EventSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str()
    location = fields.Str()
    URL_tag = fields.Str()

class UserSchema(Schema):
    id = fields.Int(required=True)
    username = fields.Str()
    event = fields.Nested(EventSchema)
    creator = fields.Boolean()

class RestaurantOptionSchema(Schema):
    id = fields.Int(required=True)
    event = fields.Nested(EventSchema)
    yelpID = fields.Str()

class RestaurantVoteSchema(Schema):
    id = fields.Int(required=True)
    user = fields.Nested(UserSchema)
    restaurant_option = fields.Nested(RestaurantOptionSchema)

class TimeOptionSchema(Schema):
    id = fields.Int(required=True)
    event = fields.Nested(EventSchema)
    timestamp = fields.Time()

class TimeVoteSchema(Schema):
    id = fields.Int(required=True)
    user = fields.Nested(UserSchema)
    time_option = fields.Nested(TimeOptionSchema)
