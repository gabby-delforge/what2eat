// USER FUNCTIONS
export async function login(_username, _eventID) {
  const response = await fetch('example.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: _username, eventID: _eventID }),
  })
  let resp = await response.json();
  return resp
};

export async function create_event(_eventName, _eventDateTime, _creator, _location) {
  const response = await fetch('example.com/create_event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventName: _eventName, _eventDateTime: _eventDateTime, creator: _creator, location: _location   }),
  })
  let resp = await response.json();
  return resp
};

export async function get_restaurant_data(_eventID, _userID) {
  const data = {eventID:_eventID, userID: _userID};
  const response = await fetch(`example.com/search_restaurant?eventID=${encodeURIComponent(data.eventID)}&userID=${encodeURIComponent(data.userID)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  let resp = await response.json();
  return resp
};

export async function vote_restaurant(_eventID, _yelpID, _userID) {
  const response = await fetch('example.com/create_event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventID: _eventID, yelpID: _yelpID, userID: _userID}),
  })
  let resp = await response.json();
  return resp
};

export async function get_restaurant_results(_eventID) {
  const data = {eventID:_eventID};
  const response = await fetch(`example.com/get_restaurants?eventID=${encodeURIComponent(data.eventID)}`, {
    method: "GET",
    headers: {'Content-Type': 'application/json' },
  })
  let resp = await response.json();
  return resp;
};

// YELP API Functions
export async function search_restaurant(_searchString, _locationString) {
  const data = {searchString:_searchString, locationString: _locationString};
  const response = await fetch(`example.com/search_restaurant?search_string=${encodeURIComponent(data.searchString)}&location_string=${encodeURIComponent(data.locationString)}`, {
    method: "GET",
    headers: {'Content-Type': 'application/json' },
  })
  let resp = await response.json();
  return resp;
};
export async function add_restaurant(_yelpID, _eventID) {
  const response = await fetch('example.com/add_restaurant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ yelpID: _yelpID, eventID: _eventID }),
  })
  let resp = await response.json();
  return resp
};
