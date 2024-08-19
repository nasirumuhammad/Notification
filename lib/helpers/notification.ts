"use server";

import { departmentDocument } from "../schemas/department";
import notificationModel, { notificationDocument } from "../schemas/notification";
import userModel from "../schemas/user";
import connectDB from "./DB";

// CRUD
interface notification {
  title: string;
  text: string;
  departmentID?: string;
  facultyID?: string;
}
export async function createNotification(notificationParam: notification) {
  try {
    await connectDB();
    await notificationModel.create(notificationParam);
  } catch (error: any) {
    console.log(error.message);
  }
}
export async function fetchSingleNotification(id: string) {
  try {
    await connectDB();
    let notification = await notificationModel.findById(id);
    if (notification) {
      return {
        title: notification.title,
        text: notification.text,
        id: notification.id,
        date: notification.createdAt
          ?.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            month: "long",
            year: "numeric",
          })
          .toString(),
      };
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
export async function fetchNotification(userID: string) {
  try {
    await connectDB();
    let user = await userModel.findById(userID).populate<{ department: departmentDocument }>("department").orFail();

    let departmentID = user.department?._id || null;
    let facultyID = user.department?.faculty || null;

    let fetchNotifications = await notificationModel.find({
      $or: [
        {
          departmentID: departmentID,
          facultyID: facultyID,
        },
        {
          departmentID: null,
          facultyID: null,
        },
      ],
    });
    let notifications = fetchNotifications.map((notification) => {
      return {
        title: notification.title,
        text: notification.text,
        id: notification.id,
        date: notification.createdAt
          ?.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            month: "long",
            year: "numeric",
          })
          .toString(),
      };
    });

    return notifications;
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}
export async function fetchALLNotification() {
  try {
    await connectDB();

    let fetchNotifications = await notificationModel.find();
    let notifications = fetchNotifications.map((notification) => {
      return {
        title: notification.title,
        text: notification.text,
        id: notification.id,
        date: notification.createdAt
          ?.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            month: "long",
            year: "numeric",
          })
          .toString(),
      };
    });

    return notifications;
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}

export async function deleteNotification(notificationID: string) {
  try {
    await connectDB();
    await notificationModel.deleteOne().where("_id").equals(notificationID);
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function updateNotification(notificationParam: notification & { id: string }) {
  try {
    await connectDB();
    await notificationModel.updateOne({ _id: notificationParam.id }, notificationParam);
  } catch (error: any) {
    console.log(error.message);
  }
}
