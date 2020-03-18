'use strict'

const User = use('App/Models/User')

module.exports = {
  Query: {
    allUsers: async() => { const users = await User.all()
      return users.toJSON()
    },
    // Get a user by its ID
    fetchUser: async(_, { id }) => {
      const user = await User.find(id)
      return user.toJSON()
    }
  },

  Mutation: {
    // Handles user login
    login: async(_, { email, password}, { auth }) => {
      const { token } = await auth.attempt(email, password)
      return token
    },

    // Create new user
    createUser: async(_, { username, email, password }) => {
      return await User.create({ username, email, password })
    }
  },
}
