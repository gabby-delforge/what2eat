//LOGIN
export async function login(_username, _eventID) {
  const response = await fetch("https://what2eat2019.herokuapp.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: _username, eventID: _eventID })
  });
  let resp = await response.json();
  return resp;
}

//CREATE_EVENT
export async function create_event(
  _eventName,
  _eventDateTime,
  _creator,
  _location
) {
  const response = await fetch(
    "https://what2eat2019.herokuapp.com/create_event",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: _eventName,
        eventDateTime: _eventDateTime,
        creator: _creator,
        location: _location
      })
    }
  );
  let resp = await response.json();
  return resp;
}

//VOTE_RESTAURANT
export async function vote_restaurant(_eventID, _yelpID, _userID) {
  const response = await fetch(
    "https://what2eat2019.herokuapp.com/vote_restaurant",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventID: _eventID,
        YelpID: _yelpID,
        userID: _userID
      })
    }
  );
  let resp = await response.json();
  return resp;
}

// GET_RESTAURANTS
// Gets all the restaurants associated with a certain event.
export async function get_event_restaurants(_eventID) {
  const data = { eventID: _eventID };
  const response = await fetch(
    `https://what2eat2019.herokuapp.com
/get_restaurants?eventID=${encodeURIComponent(data.eventID)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );
  let resp = await response.json();
  return resp;
}

//GET_RESULTS
export async function get_vote_results(_eventID) {
  const data = { eventID: _eventID };
  const response = await fetch(
    `https://what2eat2019.herokuapp.com/get_results?eventID=${encodeURIComponent(
      data.eventID
    )}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );
  let resp = await response.json();
  return resp;
}

//SEARCH_RESTAURANT
export async function search_restaurant(_searchString, _locationString) {
  const data = { searchString: _searchString, locationString: _locationString };
  const response = await fetch(
    `https://what2eat2019.herokuapp.com
/search_restaurant?search_string=${encodeURIComponent(
      data.searchString
    )}&location_string=${encodeURIComponent(data.locationString)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );
  let resp = await response.json();
  return resp;
}

//ADD_RESTAURANT
export async function add_restaurant(_yelpID, _eventID) {
  const response = await fetch(
    "https://what2eat2019.herokuapp.com/add_restaurant",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ YelpID: _yelpID, eventID: _eventID })
    }
  );
  let resp = await response.json();
  return resp;
}

//EVENT_INFO
export async function get_event_info(_eventID) {
  const data = { eventID: _eventID };
  const response = await fetch(
    `https://what2eat2019.herokuapp.com/event_info?eventID=${encodeURIComponent(
      data.eventID
    )}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );
  let resp = await response.json();
  return resp;
}
