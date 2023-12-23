import { useQuery } from "@tanstack/react-query";
import StoryItem from "../StoryItem/StoryItem";
import { getStoryUser } from "@/apis";
import { NullField } from "@/components/common";
import styles from "./StoryManage.module.css";

const StoryManage = () => {
  const {
    status,
    error,
    data: userStoryList,
  } = useQuery({
    queryKey: ["userStoryList"],
    queryFn: () => getStoryUser(),
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  return (
    <div className={styles["story-container"]}>
      {userStoryList.length > 0 ? (
        userStoryList.map((item) => (
          <StoryItem
            key={item.id}
            id={item.id}
            login_id={item.login_id}
            story_image_url={item.story_image_url}
            story_color={item.story_color}
            tags={item.tags}
            created_at={item.created_at}
            updated_at={item.updated_at}
          />
        ))
      ) : (
        <NullField text1="작성한 스토리가 없어요!" text2="좋은 추억을 남겨보세요!" />
      )}
    </div>
  );
};

export default StoryManage;
