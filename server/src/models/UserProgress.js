import mongoose from 'mongoose';

const questionStatSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
    },
    successCount: {
      type: Number,
      default: 0,
    },
    failedCount: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

const lessonProgressSchema = new mongoose.Schema(
  {
    successAttempt: {
      type: Number,
      default: 0,
    },
    failedAttempt: {
      type: Number,
      default: 0,
    },
    questions: [questionStatSchema],
  },
  { _id: false },
);

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  lessons: {
    type: Map,
    of: lessonProgressSchema,
    default: {},
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userProgressSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export const UserProgress = mongoose.model('UserProgress', userProgressSchema);
