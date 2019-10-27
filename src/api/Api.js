//LOGIN
export async function login(_username, _eventID) {
  //MOCK
  // return { user_id: 1, restaurant_votes: ["1", "2"] };
  //MOCK
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
  //MOCK
  // return { eventID: 1 };
  //MOCK
  const response = await fetch("https://what2eat2019.herokuapp.com/create_event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName: _eventName,
      eventDateTime: _eventDateTime,
      creator: _creator,
      location: _location
    })
  });
  let resp = await response.json();
  return resp;
}


//VOTE_RESTAURANT
export async function vote_restaurant(_eventID, _yelpID, _userID) {
  const response = await fetch("https://what2eat2019.herokuapp.com/vote_restaurant", {
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


// GET_RESTAURANTS
// Gets all the restaurants associated with a certain event. 
export async function get_event_restaurants(_eventID) {
  //MOCK
  // return {
  //   restaurants: [
  //     {
  //       yelpID: "0",
  //       name: "Panda Express",
  //       rating: 3,
  //       price: 1,
  //       city: "North Berkeley",
  //       categories: ["Chinese", "Black and white"],
  //       image_url:
  //         "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG",
  //       photos: [
  //         "https://dcewboipbvgi2.cloudfront.net/sites/default/files/styles/article_hero_image/public/Puppy_Dog_Labrador_Jerry.jpg?itok=XGobf9k7",
  //         "https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg",
  //         "http://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fa4be5dc2-59ed-11e8-9e86-99299e0f1a1c.jpg?crop=1909%2C1074%2C51%2C399&resize=685"
  //       ],
  //       selected: false
  //     },
  //     {
  //       yelpID: "1",
  //       name: "Top Dog",
  //       rating: 5,
  //       price: 2,
  //       city: "Downtown Berkeley",
  //       categories: ["Fast Food", "Fluffy"],
  //       image_url:
  //         "https://dcewboipbvgi2.cloudfront.net/sites/default/files/styles/article_hero_image/public/Puppy_Dog_Labrador_Jerry.jpg?itok=XGobf9k7",
  //       photos: [
  //         "https://dcewboipbvgi2.cloudfront.net/sites/default/files/styles/article_hero_image/public/Puppy_Dog_Labrador_Jerry.jpg?itok=XGobf9k7",
  //         "https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg",
  //         "http://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fa4be5dc2-59ed-11e8-9e86-99299e0f1a1c.jpg?crop=1909%2C1074%2C51%2C399&resize=685"
  //       ],
  //       selected: false
  //     },
  //     {
  //       name: "Bun",
  //       yelpID: "2",
  //       rating: 4,
  //       price: 4,
  //       city: "West Berkeley",
  //       categories: ["Bunnies", "Very Fast"],
  //       image_url:
  //         "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c11f34da-1f91-41aa-896f-143beac9258e/d22yhqn-8bb51657-36f9-435d-a25b-29b8c5af1be7.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MxMWYzNGRhLTFmOTEtNDFhYS04OTZmLTE0M2JlYWM5MjU4ZVwvZDIyeWhxbi04YmI1MTY1Ny0zNmY5LTQzNWQtYTI1Yi0yOWI4YzVhZjFiZTcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.th_KdgKw84k1rT6_IgFP6GkkOLssLa-4ZyCs4wsrP3Q",
  //       photos: [
  //         "https://dcewboipbvgi2.cloudfront.net/sites/default/files/styles/article_hero_image/public/Puppy_Dog_Labrador_Jerry.jpg?itok=XGobf9k7",
  //         "https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg",
  //         "http://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fa4be5dc2-59ed-11e8-9e86-99299e0f1a1c.jpg?crop=1909%2C1074%2C51%2C399&resize=685"
  //       ],
  //       selected: false
  //     }
  //   ]
  // };
  //MOCK
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
  //MOCK
  // return { "0": 2, "1": 14, "2": 6 };
  // MOCK
  const response = await fetch("https://what2eat2019.herokuapp.com/get_results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventID: _eventID })
  });
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
  const response = await fetch("https://what2eat2019.herokuapp.com/add_restaurant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ YelpID: _yelpID, eventID: _eventID })
  });
  let resp = await response.json();
  return resp;
}

//EVENT_INFO
export async function get_event_info(_eventID) {
  //MOCK
  // return { eventTimeMs: new Date().getTime(), name: "Birthday party" };
  //MOCK
  const data = { eventID: _eventID };
  const response = await fetch(
    `https://what2eat2019.herokuapp.com/event_info?eventID=${encodeURIComponent(data.eventID)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );
  let resp = await response.json();
  return resp;
}

