const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');
const {TasksService} = require('../../services/tasks');
const tasksService = new TasksService();

const TaskType = new GraphQLObjectType({
  name: 'TaskType',
  fields: {
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
  }
});

const TaskInputType = new GraphQLInputObjectType({
  name: 'TaskInputType',
  fields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: new GraphQLNonNull(GraphQLString)},
  }
});

const TaskUpdateType = new GraphQLInputObjectType({
  name: 'TaskUpdateType',
  fields: {
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
  }
});

const TaskMutationType = new GraphQLObjectType({
  name: 'TaskMutationType',
  description: 'Mutations for task type',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    userId: {type: new GraphQLNonNull(GraphQLID)},

    delete: {
      type: GraphQLNonNull(GraphQLBoolean),
      resolve: (instance) => {
        return tasksService.delete(instance.id, instance.userId);
      }
    },

    update: {
      type: TaskType,
      args: {taskUpdate: {type: new GraphQLNonNull(TaskUpdateType)}},
      resolve: async (instance, {taskUpdate}) => {
        return tasksService.update(instance.id, instance.userId, taskUpdate);
      }
    }
  }
});

module.exports.TaskType = TaskType;
module.exports.TaskInputType = TaskInputType;
module.exports.TaskUpdateType = TaskUpdateType;
module.exports.TaskMutationType = TaskMutationType;
