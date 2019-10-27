// USER FUNCTIONS
export async function login(_username, _eventID) {
  //MOCK
  return { UID: 1, voteData: { 0: false, 1: true } };
  //MOCK
  const response = await fetch("example.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: _username, eventID: _eventID })
  });
  let resp = await response.json();
  return resp;
}

export async function create_event(
  _eventName,
  _eventDateTime,
  _creator,
  _location
) {
  const response = await fetch("example.com/create_event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName: _eventName,
      _eventDateTime: _eventDateTime,
      creator: _creator,
      location: _location
    })
  });
  let resp = await response.json();
  return resp;
}

export async function get_restaurant_data(_eventID, _userID) {
  //MOCK
  return {
    restaurants: [
      {
        id: 0,
        avi:
          "https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Panda_Express_logo.svg/1200px-Panda_Express_logo.svg.png",
        img:
          "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG",
        photos: [
          "https://dcewboipbvgi2.cloudfront.net/sites/default/files/styles/article_hero_image/public/Puppy_Dog_Labrador_Jerry.jpg?itok=XGobf9k7",
          "https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg",
          "http://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fa4be5dc2-59ed-11e8-9e86-99299e0f1a1c.jpg?crop=1909%2C1074%2C51%2C399&resize=685"
        ],
        title: "Panda Express",
        description:
          "Panda Express is a fast food restaurant chain which serves American Chinese cuisine. With over 2,200 locations, it is the largest Asian segment restaurant chain in the United States, where it was founded and is mainly located.",
        more_info: "Pandas are large.",
        tags: ["Chinese", "Black and white"],
        open: false,
        rating: 3,
        dollar_signs: 1,
        location: "North Berkeley",
        selected: false
      },
      {
        id: 1,
        avi: "http://www.topdoghotdogs.com/images/logo_black_header.png",
        img:
          "https://dcewboipbvgi2.cloudfront.net/sites/default/files/styles/article_hero_image/public/Puppy_Dog_Labrador_Jerry.jpg?itok=XGobf9k7",
        photos: [
          "https://dcewboipbvgi2.cloudfront.net/sites/default/files/styles/article_hero_image/public/Puppy_Dog_Labrador_Jerry.jpg?itok=XGobf9k7",
          "https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg",
          "http://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fa4be5dc2-59ed-11e8-9e86-99299e0f1a1c.jpg?crop=1909%2C1074%2C51%2C399&resize=685"
        ],
        title: "Top Dog",
        description: "top dog grew out of a boys love for sausage",
        more_info: "This dog is pretty good.",
        tags: ["Fast Food", "Fluffy"],
        open: false,
        rating: 5,
        dollar_signs: 2,
        location: "Downtown Berkeley",
        selected: false
      }
    ]
  };
  //MOCK
  const data = { eventID: _eventID, userID: _userID };
  const response = await fetch(
    `example.com/search_restaurant?eventID=${encodeURIComponent(
      data.eventID
    )}&userID=${encodeURIComponent(data.userID)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );
  let resp = await response.json();

  // return resp;
}

export async function vote_restaurant(_eventID, _yelpID, _userID) {
  const response = await fetch("example.com/create_event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventID: _eventID,
      yelpID: _yelpID,
      userID: _userID
    })
  });
  let resp = await response.json();
  return resp;
}

export async function get_restaurant_results(_eventID) {
  const data = { eventID: _eventID };
  const response = await fetch(
    `example.com/get_restaurants?eventID=${encodeURIComponent(data.eventID)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );
  let resp = await response.json();
  return resp;
}

export async function get_event_info(_eventID) {
  //MOCK
  return { eventTimeMs: new Date().getTime(), name: "Birthday party" };
  //MOCK
  const data = { eventID: _eventID };
  const response = await fetch(
    `example.com/event_info?eventID=${encodeURIComponent(data.eventID)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );
  let resp = await response.json();
  return resp;
}

// YELP API Functions
export async function search_restaurant(_searchString, _locationString) {
  const data = { searchString: _searchString, locationString: _locationString };
  const response = await fetch(
    `example.com/search_restaurant?search_string=${encodeURIComponent(
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
export async function add_restaurant(_yelpID, _eventID) {
  const response = await fetch("example.com/add_restaurant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ yelpID: _yelpID, eventID: _eventID })
  });
  let resp = await response.json();
  return resp;
}
