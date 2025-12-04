export type CategoryType = "Career" | "Romance" | "Belonging" | "K-POP";

export type Topic = {
  id: number | string;
  label: CategoryType;
};

export type TopicProps = {
  topics: Topic[];
  active: CategoryType;
  onSelect: (key: CategoryType) => void;
  itemWidth?: number;
  gap?: number;
  visibleCount?: number;
};
export type Topics = {
  id: number;
  title: string;
  description: string;
  aiRole: string;
  myRole: string;
};
