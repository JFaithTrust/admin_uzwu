import { Feedback } from "@/types";
import { create } from "zustand";
import { createFeedback, deleteFeedback, getFeedbackById, getFeedbacks, updateFeedback } from "@/store/api";

interface FeedbackState{
  feedbacks: Feedback[];
  feedback: Feedback | null;
  getFeedbacks: () => Promise<void>;
  getFeedbackById: (id: string) => Promise<void>;
  createFeedback: (feedback: {
    message: string;
    fullName: string;
    dueDate: Date;
  }) => Promise<void>;
  updateFeedback: (feedback: Feedback) => Promise<void>;
  deleteFeedback: (id: string) => Promise<void>;
}

const useFeedbackStore = create<FeedbackState>((set) => ({
  feedbacks: [],
  feedback: null,
  getFeedbacks: async () => {
    const feedbacks = await getFeedbacks();
    return set(
      (state) => ({...state, feedbacks})
    );
  },
  getFeedbackById: async (id) => {
    const feedback = await getFeedbackById(id);
    return set(
      (state) => ({...state, feedback})
    );
  },
  createFeedback: async (feedback) => {
    const newFeedback = await createFeedback(feedback);
    return set(
      (state) => ({...state, feedbacks: [...state.feedbacks, newFeedback]})
    );
  },
  updateFeedback: async (feedback) => {
    const updatedFeedback = await updateFeedback(feedback);
    return set(
      (state) => ({
        ...state,
        feedbacks: state.feedbacks.map((f) => f.id === updatedFeedback.id ? updatedFeedback : f),
      })
    );
  },
  deleteFeedback: async (id) => {
    await deleteFeedback(id);
    return set(
      (state) => ({
        ...state,
        feedbacks: state.feedbacks.filter((f) => f.id !== id),
      })
    );
  },
}));

export default useFeedbackStore;