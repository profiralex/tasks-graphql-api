const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} = require('graphql');
const {TaskType, TaskInputType, TaskMutationType} = require('./task');
const {TasksService} = require('../../services/tasks');

const tasksService = new TasksService();

const MeQueryType = new GraphQLObjectType({
  name: 'MeQueryType',
  description: 'Queries for authenticated users',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: async (instance) => {
        return tasksService.getUserTasks(instance.id);
      }
    }
  }
});

const MeMutationType = new GraphQLObjectType({
  name: 'MeMutationType',
  description: 'Mutations for authenticated users',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    createTask: {
      type: TaskType,
      description: "Mutation to create a task",
      args: {taskInput: {type: new GraphQLNonNull(TaskInputType)}},
      resolve: async (instance, {taskInput}) => {
        return tasksService.create(instance.id, taskInput.title, taskInput.description);
      }
    },
    task: {
      type: TaskMutationType,
      description: "Task dedicated mutations",
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
      resolve: async (instance, {id}) => {
        return tasksService.getUserTask(id, instance.id);
      }
    }
  }
});

module.exports.MeQueryType = MeQueryType;
module.exports.MeMutationType = MeMutationType;
