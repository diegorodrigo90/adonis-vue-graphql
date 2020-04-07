'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')
const registerRules = use('App/Rules/Auth/RegisterRules')

const GraphQLError = use('Adonis/Addons/GraphQLError')

module.exports = {
  Query: {
    isAuthenticated: async (_, __, { auth }) => {
      try {

        await auth.check()

        return auth.getUser()

      } catch (error) {
        throw new GraphQLError("Not logged in", error)

      }
    },
    me: async (_, __, { auth }) => {
      return auth.getUser()
    },
    // me:  (_, __, { auth }) => console.log(auth)
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
      const token = await auth.withRefreshToken().attempt(email, password)
      return token
    },

    // Create new user
    createUser: async (_, { username, email, password, passwordConfirm }) => {
      const validation = await validateAll({ username, email, password, passwordConfirm }, registerRules)

      if (validation.fails()) {
        throw new GraphQLError('Validation Failed', validation.messages())
      }

      const user = { username, email, password }

      return await User.create(user)
    }
  }
}
