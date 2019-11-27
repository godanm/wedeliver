/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createActivity = `mutation CreateActivity($input: CreateActivityInput!) {
  createActivity(input: $input) {
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
export const updateActivity = `mutation UpdateActivity($input: UpdateActivityInput!) {
  updateActivity(input: $input) {
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
export const deleteActivity = `mutation DeleteActivity($input: DeleteActivityInput!) {
  deleteActivity(input: $input) {
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
export const createTrip = `mutation CreateTrip($input: CreateTripInput!) {
  createTrip(input: $input) {
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
export const updateTrip = `mutation UpdateTrip($input: UpdateTripInput!) {
  updateTrip(input: $input) {
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
export const deleteTrip = `mutation DeleteTrip($input: DeleteTripInput!) {
  deleteTrip(input: $input) {
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
export const createGroup = `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
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
export const updateGroup = `mutation UpdateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
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
export const deleteGroup = `mutation DeleteGroup($input: DeleteGroupInput!) {
  deleteGroup(input: $input) {
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
export const createUsers = `mutation CreateUsers($input: CreateUsersInput!) {
  createUsers(input: $input) {
    id
    username
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
    phone
    email
    fname
    lname
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
export const updateToDo = `mutation UpdateToDo($input: UpdateToDoInput!) {
  updateToDo(input: $input) {
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
export const deleteToDo = `mutation DeleteToDo($input: DeleteToDoInput!) {
  deleteToDo(input: $input) {
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
