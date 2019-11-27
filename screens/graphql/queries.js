/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getActivity = `query GetActivity($id: ID!) {
  getActivity(id: $id) {
    id
    tripid {
      id
      tripdestination
      tripstart
      tripend
      thumpbnails
      status
      remarks
    }
    activityname
    description
    title
    location
    cost
    status
    todos {
      id
      title
      description
      duedate
      startdate
      status
    }
  }
}
`;
export const listActivitys = `query ListActivitys(
  $filter: ModelActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  listActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      activityname
      description
      title
      location
      cost
      status
    }
    nextToken
  }
}
`;
export const getTrip = `query GetTrip($id: ID!) {
  getTrip(id: $id) {
    id
    groupid {
      id
      groupname
      image
    }
    tripdestination
    tripstart
    tripend
    thumpbnails
    status
    remarks
  }
}
`;
export const listTrips = `query ListTrips(
  $filter: ModelTripFilterInput
  $limit: Int
  $nextToken: String
) {
  listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      tripdestination
      tripstart
      tripend
      thumpbnails
      status
      remarks
    }
    nextToken
  }
}
`;
export const getGroup = `query GetGroup($id: ID!) {
  getGroup(id: $id) {
    id
    groupname
    groupmembers {
      id
      username
      phone
      email
      fname
      lname
    }
    groupadmins {
      id
      username
      phone
      email
      fname
      lname
    }
    image
  }
}
`;
export const listGroups = `query ListGroups(
  $filter: ModelGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      groupname
      image
    }
    nextToken
  }
}
`;
export const getUsers = `query GetUsers($id: ID!) {
  getUsers(id: $id) {
    id
    username
    phone
    email
    fname
    lname
  }
}
`;
export const listUserss = `query ListUserss(
  $filter: ModelUsersFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      phone
      email
      fname
      lname
    }
    nextToken
  }
}
`;
export const getToDo = `query GetToDo($id: ID!) {
  getToDo(id: $id) {
    id
    title
    description
    duedate
    startdate
    status
    owners {
      id
      username
      phone
      email
      fname
      lname
    }
  }
}
`;
export const listToDos = `query ListToDos(
  $filter: ModelToDoFilterInput
  $limit: Int
  $nextToken: String
) {
  listToDos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      duedate
      startdate
      status
    }
    nextToken
  }
}
`;
