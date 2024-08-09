import { FAQ } from "@/types";
import { create } from "zustand";
import { createFaq, deleteFaq, getFaqById, getFaqs, updateFaq } from "@/store/api";

interface FaqState {
  faqs: FAQ[];
  faq: FAQ | null;
  getFaqs: () => Promise<void>;
  getFaqById: (id: string) => Promise<void>;
  createFaq: (faq: {question: string; answer: string}) => Promise<void>;
  updateFaq: (faq: FAQ) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
}

const useFaqStore = create<FaqState>((set) => ({
  faqs: [],
  faq: null,
  getFaqs: async () => {
    const faqs = await getFaqs();
    return set(
      (state) => ({...state, faqs})
    );
  },
  getFaqById: async (id: string) => {
    const faq = await getFaqById(id);
    return set(
      (state) => ({...state, faq})
    );
  },
  createFaq: async (faq) => {
    const newFaq = await createFaq(faq);
    return set(
      (state) => ({...state, faqs: [...state.faqs, newFaq]})
    );
  },
  updateFaq: async (faq) => {
    const updatedFaq = await updateFaq(faq);
    return set(
      (state) => ({
        ...state,
        faqs: state.faqs.map((f) => f.id === updatedFaq.id ? updatedFaq : f),
      })
    );
  },
  deleteFaq: async (id) => {
    await deleteFaq(id);
    return set(
      (state) => ({
        ...state,
        faqs: state.faqs.filter((f) => f.id !== id),
      })
    );
  },
}));

export default useFaqStore;