/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createActivity = `mutation CreateActivity($input: CreateActivityInput!) {
  createActivity(input: $input) {
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
export const createGroup = `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
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
export const createToDo = `mutation CreateToDo($input: CreateToDoInput!) {
  createToDo(input: $input) {
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
export const createTrip = `mutation CreateTrip($input: CreateTripInput!) {
  createTrip(input: $input) {
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
export const createUsers = `mutation CreateUsers($input: CreateUsersInput!) {
  createUsers(input: $input) {
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
export const deleteActivity = `mutation DeleteActivity($input: DeleteActivityInput!) {
  deleteActivity(input: $input) {
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
export const deleteGroup = `mutation DeleteGroup($input: DeleteGroupInput!) {
  deleteGroup(input: $input) {
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
export const deleteToDo = `mutation DeleteToDo($input: DeleteToDoInput!) {
  deleteToDo(input: $input) {
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
export const deleteTrip = `mutation DeleteTrip($input: DeleteTripInput!) {
  deleteTrip(input: $input) {
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
export const deleteUsers = `mutation DeleteUsers($input: DeleteUsersInput!) {
  deleteUsers(input: $input) {
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
export const updateActivity = `mutation UpdateActivity($input: UpdateActivityInput!) {
  updateActivity(input: $input) {
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
export const updateGroup = `mutation UpdateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
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
export const updateToDo = `mutation UpdateToDo($input: UpdateToDoInput!) {
  updateToDo(input: $input) {
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
export const updateTrip = `mutation UpdateTrip($input: UpdateTripInput!) {
  updateTrip(input: $input) {
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
export const updateUsers = `mutation UpdateUsers($input: UpdateUsersInput!) {
  updateUsers(input: $input) {
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
