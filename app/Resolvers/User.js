'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')
const registerRules = use('App/Rules/Auth/RegisterRules')
const loginRules = use('App/Rules/Auth/LoginRules')


const GraphQLError = use('Adonis/Addons/GraphQLError')

module.exports = {
  Query: {
    me: async (_, __, { auth }) => {
      try {
        await auth.check()
        return auth.getUser()
      } catch (error) {
        throw new GraphQLError('No user logged in')
      }
    },
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
    login: async (_, { email, password, remmenber }, { auth }) => {
      const validation = await validateAll({ email, password, remmenber }, loginRules)

      if (validation.fails()) {
        throw new GraphQLError(validation.messages())
      }

      try {
        const token = await auth.withRefreshToken().attempt(email, password)
        return token
      } catch (error) {
        throw new GraphQLError('Usuário/senha inválidos')
      }
    },
    refreshToken: async (_, { refreshToken }, { auth }) => {
      try {
        const token = await auth.newRefreshToken().generateForRefreshToken(refreshToken)
        return token
      } catch (error) {
        throw new GraphQLError('Realize login novamente')
      }
    },
    // Create new user
    createUser: async (_, { username, email, password, passwordConfirm }) => {
      const validation = await validateAll({ username, email, password, passwordConfirm }, registerRules)

      if (validation.fails()) {
        throw new GraphQLError(validation.messages())
      }

      const user = { username, email, password }

      return User.create(user)
    }
  }
}
