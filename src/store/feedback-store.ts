import { Feedback} from "@/types";
import {create} from "zustand";
import { getFeedbacks, createFeedback, updateFeedback, deleteFeedback } from "@/store/api";

interface FeedbackState{
  feedbacks: Feedback[];
  feedback: Feedback | null;
  getFeedbacks: () => Promise<void>;
  createFeedback: (feedback: {
    message: string;
    fullName: string;
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
