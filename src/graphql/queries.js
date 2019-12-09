/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getActivity = `query GetActivity($id: ID!) {
  getActivity(id: $id) {
    activityname
    cost
    description
    id
    location
    status
    title
    todos {
      items {
        description
        duedate
        id
        startdate
        status
        title
      }
      nextToken
    }
    tripid {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      groupid {
        groupname
        id
        image
      }
      id
      remarks
      status
      thumpbnails
      tripdestination
      tripend
      tripstart
    }
  }
}
`;
export const getGroup = `query GetGroup($id: ID!) {
  getGroup(id: $id) {
    groupmembers {
      email
      fname
      groupmembers {
        groupname
        id
        image
      }
      id
      lname
      phone
      todoowner {
        description
        duedate
        id
        startdate
        status
        title
      }
      username
    }
    groupname
    id
    image
    trip {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      groupid {
        groupname
        id
        image
      }
      id
      remarks
      status
      thumpbnails
      tripdestination
      tripend
      tripstart
    }
  }
}
`;
export const getToDo = `query GetToDo($id: ID!) {
  getToDo(id: $id) {
    activity {
      activityname
      cost
      description
      id
      location
      status
      title
      todos {
        nextToken
      }
      tripid {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    description
    duedate
    id
    owners {
      items {
        email
        fname
        id
        lname
        phone
        username
      }
      nextToken
    }
    startdate
    status
    title
  }
}
`;
export const getTrip = `query GetTrip($id: ID!) {
  getTrip(id: $id) {
    activity {
      activityname
      cost
      description
      id
      location
      status
      title
      todos {
        nextToken
      }
      tripid {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    groupid {
      groupmembers {
        email
        fname
        id
        lname
        phone
        username
      }
      groupname
      id
      image
      trip {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    id
    remarks
    status
    thumpbnails
    tripdestination
    tripend
    tripstart
  }
}
`;
export const getUsers = `query GetUsers($id: ID!) {
  getUsers(id: $id) {
    email
    fname
    groupmembers {
      groupmembers {
        email
        fname
        id
        lname
        phone
        username
      }
      groupname
      id
      image
      trip {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    id
    lname
    phone
    todoowner {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      description
      duedate
      id
      owners {
        nextToken
      }
      startdate
      status
      title
    }
    username
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
      activityname
      cost
      description
      id
      location
      status
      title
      todos {
        nextToken
      }
      tripid {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    nextToken
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
      groupmembers {
        email
        fname
        id
        lname
        phone
        username
      }
      groupname
      id
      image
      trip {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    nextToken
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
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      description
      duedate
      id
      owners {
        nextToken
      }
      startdate
      status
      title
    }
    nextToken
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
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      groupid {
        groupname
        id
        image
      }
      id
      remarks
      status
      thumpbnails
      tripdestination
      tripend
      tripstart
    }
    nextToken
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
      email
      fname
      groupmembers {
        groupname
        id
        image
      }
      id
      lname
      phone
      todoowner {
        description
        duedate
        id
        startdate
        status
        title
      }
      username
    }
    nextToken
  }
}
`;
