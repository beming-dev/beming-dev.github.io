import React, { useState } from "react";
import "../styles/resume.css"; // 이 페이지에서만 사용하는 CSS (선택)

const ResumePage = () => {
  // 'ko' 또는 'en'
  const [lang, setLang] = useState("ko");

  // 언어 토글 함수
  const toggleLanguage = () => {
    setLang((prev) => (prev === "ko" ? "en" : "ko"));
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen py-8">
      {/* A4 컨테이너 */}
      <div className="a4-container w-[210mm] min-h-[297mm] bg-white relative shadow-lg">
        {/* 인쇄하기 버튼 (인쇄 시 숨김) */}
        <div className=" w-full justify-between absolute flex top-4 right-0 print-hide">
          <button
            onClick={toggleLanguage}
            className="w-24 px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-500 transition"
          >
            {/* 버튼에 표시할 텍스트: 현재 언어가 ko면 'ENGLISH' 버튼, en이면 '한국어' 버튼 */}
            {lang === "ko" ? "ENGLISH" : "한국어"}
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-indigo-500 text-white rounded-md text-sm hover:bg-indigo-600 transition mb-4"
          >
            인쇄하기
          </button>
        </div>

        {/* Hero 영역 */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-20 py-10 flex flex-col items-center">
          <div>
            <div className="self-start gap-3 flex justify-between items-center">
              {/* 이름 & 직책 */}
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  채민관 (Chae Min Gwan)
                </h1>
                <p className="text-sm text-indigo-100 mt-1">
                  Fullstack Developer
                </p>
              </div>

              {/* 프로필 사진 */}
              <div className="w-28 h-28 rounded-full bg-gray-200 mb-4 overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 연락처, SNS 등 */}
            <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-semibold">Phone:</span>
                <span>010-7107-9301</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">Email:</span>
                <span>mingfordev@gmail.com</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">GitHub:</span>
                <span>github.com/beming-dev</span>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="px-8 py-8">
          {/* 소개 섹션 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "소개" : "Profile"}
            </h2>
            <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {lang === "ko"
                  ? "새로운걸 배우기 좋아하고 의사소통을 중시하는 개발자 채민관입니다."
                  : "Developer Mingwan who likes to learn something new and emphasizes communication"}
              </p>
            </div>
          </section>

          {/* 학력 섹션 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "학력" : "Education"}
            </h2>
            <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
              <h3 className="font-semibold text-base">
                {lang === "ko" ? "서울시립대학교" : "University of Seoul"}
              </h3>
              <p className="text-sm text-gray-500">
                {lang === "ko"
                  ? "2019.03 ~ 2025.08 | 컴퓨터과학부"
                  : "Mar 2019 ~ Aug 2025 | Computer Science"}
              </p>
            </div>
          </section>

          {/* 협업 프로젝트 섹션 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "협업 프로젝트" : "Collaborated Project"}
            </h2>
            <div className="grid gap-4">
              {/* 회사 카드 #1 */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
                <h3 className="font-semibold text-base">
                  {lang === "ko" ? "About 프로젝트" : "About Project"}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {lang === "ko"
                    ? "2019.01 ~ 2021.12 | 프론트엔드 개발자"
                    : "Jan 2019 ~ Dec 2021 | Frontend Developer"}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {lang === "ko" ? (
                    <>
                      <li>React.js 웹 애플리케이션 개발</li>
                      <li>UI/UX 개선 및 반응형 웹 구현</li>
                      <li>코드 리뷰 및 팀원 멘토링 지원</li>
                    </>
                  ) : (
                    <>
                      <li>Developed web apps using React.js</li>
                      <li>Implemented responsive UI/UX improvements</li>
                      <li>Conducted code reviews and mentored team</li>
                    </>
                  )}
                </ul>
              </div>

              {/* 회사 카드 #1 */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
                <h3 className="font-semibold text-base">
                  {lang === "ko" ? "서울도서이음" : "Seoul Book Connection"}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {lang === "ko"
                    ? "2019.01 ~ 2021.12 | 프론트엔드 개발자"
                    : "Jan 2019 ~ Dec 2021 | Frontend Developer"}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {lang === "ko" ? (
                    <>
                      <li>React.js 웹 애플리케이션 개발</li>
                      <li>UI/UX 개선 및 반응형 웹 구현</li>
                      <li>코드 리뷰 및 팀원 멘토링 지원</li>
                    </>
                  ) : (
                    <>
                      <li>Developed web apps using React.js</li>
                      <li>Implemented responsive UI/UX improvements</li>
                      <li>Conducted code reviews and mentored team</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* 개인 프로젝트 섹션 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "개인 프로젝트" : "Personal Project"}
            </h2>
            <div className="grid gap-4">
              {/* 회사 카드 #1 */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
                <h3 className="font-semibold text-base">
                  {lang === "ko" ? "주식 시뮬레이션" : "Stock Simulation"}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {lang === "ko"
                    ? "2019.01 ~ 2021.12 | 프론트엔드 개발자"
                    : "Jan 2019 ~ Dec 2021 | Frontend Developer"}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {lang === "ko" ? (
                    <>
                      <li>React.js 웹 애플리케이션 개발</li>
                      <li>UI/UX 개선 및 반응형 웹 구현</li>
                      <li>코드 리뷰 및 팀원 멘토링 지원</li>
                    </>
                  ) : (
                    <>
                      <li>Developed web apps using React.js</li>
                      <li>Implemented responsive UI/UX improvements</li>
                      <li>Conducted code reviews and mentored team</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* 기술 스택 섹션 */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "기술 스택" : "Skills"}
            </h2>
            <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
              <div className="flex flex-wrap gap-2">
                {/* 각각의 박스 */}
                <div className="w-full flex justify-between">
                  <div className="flex flex-col justify-start items-center space-y-2">
                    <span>Frontend</span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      React.js
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      Next.js
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      Tailwind.css
                    </span>
                  </div>
                  <div className="flex flex-col justify-start items-center space-y-2">
                    <span>Backend</span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      Express.js
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      Nest.js
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      Spring
                    </span>
                  </div>
                  <div className="flex flex-col justify-start items-center space-y-2">
                    <span>Etc.</span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      Git
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      Docker
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 기타 섹션 */}
          <section>
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "기타" : "Etc."}
            </h2>
            <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
              <p className="text-sm text-gray-700">
                {lang === "ko"
                  ? "자격증, 수상 내역, 동아리 활동, 개인 프로젝트, 취미 등…"
                  : "Certificates, awards, club activities, personal projects, hobbies..."}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
