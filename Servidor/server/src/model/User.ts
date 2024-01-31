import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  roles: {
    User: number;
    Editor: number;
    Admin: number;
  };
  password: string;
  refreshToken: string[];
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: [String],
  },
  { collection: 'User' }
);

const UserModel = mongoose.model<IUser>('User', userSchema);

export  {UserModel, IUser};
