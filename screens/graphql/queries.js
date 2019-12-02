/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getActivity = `query GetActivity($id: ID!) {
  getActivity(id: $id) {
    id
    tripid {
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
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
    }
    activityname
    description
    title
    location
    cost
    status
    todos {
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
        nextToken
      }
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
    trip {
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
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
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
      groupmembers {
        nextToken
      }
      trip {
        id
        tripdestination
        tripstart
        tripend
        thumpbnails
        status
        remarks
      }
      image
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
    activity {
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
        nextToken
      }
    }
    owners {
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
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
      owners {
        nextToken
      }
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
      groupmembers {
        nextToken
      }
      trip {
        id
        tripdestination
        tripstart
        tripend
        thumpbnails
        status
        remarks
      }
      image
    }
    tripdestination
    tripstart
    tripend
    thumpbnails
    status
    remarks
    activity {
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
        nextToken
      }
    }
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
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
    }
    nextToken
  }
}
`;
export const getUsers = `query GetUsers($id: ID!) {
  getUsers(id: $id) {
    id
    username
    groupmembers {
      id
      groupname
      groupmembers {
        nextToken
      }
      trip {
        id
        tripdestination
        tripstart
        tripend
        thumpbnails
        status
        remarks
      }
      image
    }
    todoowner {
      id
      title
      description
      duedate
      startdate
      status
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
      owners {
        nextToken
      }
    }
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
      groupmembers {
        id
        groupname
        image
      }
      todoowner {
        id
        title
        description
        duedate
        startdate
        status
      }
      phone
      email
      fname
      lname
    }
    nextToken
  }
}
`;
