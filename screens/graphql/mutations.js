/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createActivity = `mutation CreateActivity($input: CreateActivityInput!) {
  createActivity(input: $input) {
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
export const updateActivity = `mutation UpdateActivity($input: UpdateActivityInput!) {
  updateActivity(input: $input) {
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
export const deleteActivity = `mutation DeleteActivity($input: DeleteActivityInput!) {
  deleteActivity(input: $input) {
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
export const createGroup = `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
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
export const updateGroup = `mutation UpdateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
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
export const deleteGroup = `mutation DeleteGroup($input: DeleteGroupInput!) {
  deleteGroup(input: $input) {
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
export const createToDo = `mutation CreateToDo($input: CreateToDoInput!) {
  createToDo(input: $input) {
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
export const updateToDo = `mutation UpdateToDo($input: UpdateToDoInput!) {
  updateToDo(input: $input) {
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
export const deleteToDo = `mutation DeleteToDo($input: DeleteToDoInput!) {
  deleteToDo(input: $input) {
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
export const createTrip = `mutation CreateTrip($input: CreateTripInput!) {
  createTrip(input: $input) {
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
export const updateTrip = `mutation UpdateTrip($input: UpdateTripInput!) {
  updateTrip(input: $input) {
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
export const deleteTrip = `mutation DeleteTrip($input: DeleteTripInput!) {
  deleteTrip(input: $input) {
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
export const createUsers = `mutation CreateUsers($input: CreateUsersInput!) {
  createUsers(input: $input) {
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
export const updateUsers = `mutation UpdateUsers($input: UpdateUsersInput!) {
  updateUsers(input: $input) {
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
export const deleteUsers = `mutation DeleteUsers($input: DeleteUsersInput!) {
  deleteUsers(input: $input) {
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
