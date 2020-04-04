'use strict'

const User = use('App/Models/User')

const HEADER_NAME = 'authorization'


module.exports = {
  Query: {
    isAuthenticated: async (next, src, args, { auth }) => {
      try {
        await auth.check()
        return next()
      } catch (error) {
        throw new GraphQLError('User has to be authenticated')
      }
    },
    me: async (_, root, args, context) => context,
    allUsers: async () => {
      const users = await User.all()
      return users.toJSON()
    },
    // Get a user by its ID
    fetchUser: async (_, { id }) => {
      const user = await User.find(id)
      return user.toJSON()
    }
  },

  Mutation: {
    // Handles user login
    login: async (_, { email, password }, { auth }) => {
      const { token } = await auth.attempt(email, password)
      return token
    },

    // Create new user
    createUser: async (_, { username, email, password }) => await User.create({ username, email, password })
  }
}
