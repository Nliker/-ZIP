import React, { useState } from "react";

import { useNavigate } from "react-router";

import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/atoms";

import QnABar from "./QnABar";
import QnAList from "../../pages/qna/QnAList";
import QnAPagination from "../../pages/qna/QnAPagination";

import { toast } from "react-toastify";

import { TitleText } from "../../styles/TextStyle";
import { Container } from "../../styles/basicStyle";
import { Button } from "../../styles/ButtonStyles";
import {
  ButtonContainer,
  ButtonWrapper,
} from "../../styles/qnaStyles/QnAStyle";
import { Helmet } from "react-helmet-async";

function QnA() {
  const navigate = useNavigate();

  const isLogin = useRecoilValue(loginState);

  const [qnaPage, setQnaPage] = useState(1);

  const onClickPost = () => {
    if (isLogin) {
      navigate(`/qna/post`);
    } else {
      toast.warn("로그인 후 이용할 수 있습니다.");
    }
  };

  return (
    <>
      <Helmet>
        <title>분리수ZIP - 게시판</title>
        <meta
          name="description"
          content="AI가 분류해주는 분리수거 서비스 게시판"
        />
        <link rel="canonical" href="/qna" />
      </Helmet>
      <Container>
        <TitleText>Q&A</TitleText>
        <QnABar qnaPage={qnaPage} />
        <QnAList qnaPage={qnaPage} />
        <ButtonContainer>
          <ButtonWrapper>
            <Button onClick={onClickPost}>작성하기</Button>
          </ButtonWrapper>
        </ButtonContainer>
        <QnAPagination qnaPage={qnaPage} setQnaPage={setQnaPage} />
      </Container>
    </>
  );
}

export default QnA;
