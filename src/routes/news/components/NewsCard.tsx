import styled from "styled-components";
import dayjs from "dayjs";
import { H4, P, screenMdMin } from "../../../shared/styles";
import { StyledLink } from "../../../shared/components/Link";

type Headline = {
  main: string;
};

export type NewsArticle = {
  headline: Headline;
  abstract: string;
  country: string;
  pubDate: Date;
  web_url: string;
};

type NewsCardProps = {
  data: NewsArticle;
  articleType: string;
};

const CardWrapper = styled.div`
  width: 100%;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  @media ${screenMdMin} {
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ImageWrapper = styled.img`
  border-radius: var(--border-radius);
  max-height: 75%;
  max-width: 100%;
  margin-top: var(--spacing-md);
  @media ${screenMdMin} {
    margin-top: 0;
    max-height: 200px;
    width: 200px;
  }
`;
const StyledHeader = styled(H4)`
  margin-bottom: var(--spacing-md);
  text-decoration: underline;
  @media ${screenMdMin} {
    font-size: 18px;
  }
`;

const StyledText = styled(P)`
  font-size: var(--font-size-mobile);
  padding: var(--spacing-xs) 0;
  @media ${screenMdMin} {
    font-size: var(--font-size-p);
  }
`;
const NewsCard = (props: NewsCardProps) => {
  const { data, articleType } = props;

  return (
    <CardWrapper>
      <div>
        <StyledHeader>{data.headline.main}</StyledHeader>
        <StyledText>{data.abstract}</StyledText>
        <StyledText>
          Date Published: {dayjs(data.pubDate).format("DD/MM/YYYY")}
        </StyledText>
        <StyledLink to={data.web_url} target={"_blank"}>
          Link to Article
        </StyledLink>
      </div>
      <ImageWrapper
        src={
          articleType === "Nutrition"
            ? require("../../../assets/images/nutritionNewsImage.jpeg")
            : articleType === "Health"
            ? require("../../../assets/images/healthNewsImage.jpeg")
            : require("../../../assets/images/pharamcuticalsNewsImage.jpeg")
        }
      />
    </CardWrapper>
  );
};

export default NewsCard;
