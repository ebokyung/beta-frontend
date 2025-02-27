import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserLikeList } from "@/apis";
import { FilterButton } from "@/components/common";
import { LikeItemList } from "@/components/mypage";
import styles from "./LikeManagePage.module.css";

const categories = ["공연", "전시"];

const LikeManagePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("공연");
  const queryClient = useQueryClient();

  const handleClickFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { textContent: value } = e.target as HTMLButtonElement;
    setSelectedCategory(value!);
    queryClient.invalidateQueries({ queryKey: ["userLikeList"] });
  };

  const { status, error } = useQuery({
    queryKey: ["userLikeList"],
    queryFn: () => getUserLikeList(),
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  return (
    <div className={styles["filter-row"]}>
      <div className={styles["filter-contents"]}>
        {categories.map((item) => (
          <FilterButton key={item} selected={selectedCategory === item} onClick={handleClickFilterButton}>
            {item}
          </FilterButton>
        ))}
      </div>
      <LikeItemList selectedCategory={selectedCategory} />
    </div>
  );
};

export default LikeManagePage;
