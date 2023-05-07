import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingProgress from "../../shared/components/LoadingProgress";
import Select from "../../shared/components/Select";
import { H2, screenMdMin } from "../../shared/styles";
import NewsCard, { NewsArticle } from "./components/NewsCard";

const NEWS_SELECT_OPTIONS = [
  {
    name: "Nutrition",
  },
  {
    name: "Pharmaceuticals",
  },
  {
    name: "Health",
  },
];

const PageWrapper = styled.div`
  padding: var(--spacing-md);
`;

const ArticlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  margin-bottom: var(--spacing-md);
  justify-content: space-between;
  @media ${screenMdMin} {
    width: 65%;
  }
`;

const StyledHeader = styled(H2)`
  margin-left: var(--spacing-md);
  text-decoration: underline;
  @media ${screenMdMin} {
    margin-top: var(--spacing-sm);
  }
`;

const SelectWrapper = styled.div`
  width: 200px;
`;

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [articleType, setArticleType] = useState("Nutrition");

  const getNewsArticles = async () => {
    setLoading(true);
    const articles = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${articleType}&api-key=${process.env.REACT_APP_NEWS_API_KEY}`
    );
    setNewsArticles(articles.data.response.docs);
    setLoading(false);
  };

  const handleArticleTypeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setArticleType(e.target.value);
  };

  useEffect(() => {
    if (!articleType) return;
    getNewsArticles();
  }, [articleType]);

  if (loading || !articleType) {
    return <LoadingProgress />;
  }

  return (
    <PageWrapper>
      <HeaderWrapper>
        <SelectWrapper>
          <Select
            label="Search Related Articles"
            name="newsSelect"
            required={false}
            options={NEWS_SELECT_OPTIONS}
            currentValue={articleType}
            onChange={handleArticleTypeChange}
          />
        </SelectWrapper>
        <StyledHeader>{articleType} Related News</StyledHeader>
      </HeaderWrapper>

      <ArticlesWrapper>
        {newsArticles?.map((article: NewsArticle) => {
          return <NewsCard data={article} articleType={articleType} />;
        })}
      </ArticlesWrapper>
    </PageWrapper>
  );
};

export default NewsPage;
