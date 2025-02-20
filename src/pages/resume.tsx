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
        <div className=" w-full justify-between absolute flex  sm:top-4 top-0 right-0 print-hide z-0">
          <button
            onClick={toggleLanguage}
            className="w-24 px-3 py-2 sm: bg-indigo-600 bg-transparent text-white text-sm rounded-md hover:bg-indigo-500 transition"
          >
            {/* 버튼에 표시할 텍스트: 현재 언어가 ko면 'ENGLISH' 버튼, en이면 '한국어' 버튼 */}
            {lang === "ko" ? "ENGLISH" : "한국어"}
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-2 sm: bg-indigo-500 bg-transparent text-white rounded-md text-sm hover:bg-indigo-600 transition"
          >
            인쇄하기
          </button>
        </div>

        {/* Hero 영역 */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-20 py-10 flex flex-col items-center z-10">
          <div>
            <div className="self-start gap-3 flex justify-between items-center">
              {/* 이름 & 직책 */}
              <div className="min-h-full  flex flex-col justify-between">
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
        <div className="px-4 py-8 flex flex-col items-center">
          {/* 소개 섹션 */}
          <section className="mb-8 w-full">
            <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">
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
          <section className="mb-8 w-full">
            <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">
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
          <section className="mb-8 w-full">
            <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "협업 프로젝트" : "Collaborated Project"}
            </h2>
            <div className="grid gap-4">
              {/* 회사 카드 #1 */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4 space-y-2">
                {/* 프로젝트 제목/기간/직무 */}
                <h3 className="text-xl font-semibold text-base">
                  {lang === "ko" ? "About 프로젝트" : "About Project"}
                </h3>
                <p className="text-md text-gray-500">
                  {lang === "ko"
                    ? "2022.06 ~ 현재 | 백엔드 개발자"
                    : "Jun 2022 ~ Present | Backend Developer"}
                </p>
                <br />
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "프로젝트 소개" : "Project Introduction"}
                  </h4>
                  <p className="text-md">
                    {lang === "ko"
                      ? "대학생을 위한 모임 플랫폼 서비스입니다. 스터디, 번개 모임, 소모임 등의 기능을 제공하며, 현재 400명 이상의 유저가 이용중입니다."
                      : "A gathering platform for college students (study, meetups, clubs) with over 400 active users."}
                  </p>
                  <p className="text-blue-500 text-sm mt-3">
                    Backend:{" "}
                    <a
                      href="https://github.com/AboutClan/nest-back"
                      className="underline hover:text-blue-700"
                    >
                      https://github.com/AboutClan/nest-back
                    </a>
                  </p>
                  <p className="text-blue-500 text-sm">
                    Frontend:{" "}
                    <a
                      href="https://github.com/AboutClan/About"
                      className="underline hover:text-blue-700"
                    >
                      https://github.com/AboutClan/About
                    </a>
                  </p>
                </div>
                <br />
                {/* 기여도(Contributions) */}
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "기여도 (80%)" : "Contributions (80%)"}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
                    {lang === "ko" ? (
                      <>
                        <li>
                          AWS codepipeline을 이용해 EC2에 Docker container로
                          프론트엔드, 백엔드를 배포하는 CI/CD 파이프라인 구성
                        </li>
                        <li>
                          Filebeat, ElasticSearch, Logstash, Kibana를
                          Docker-compose로 묶어 Docker container의 로그를
                          시각화하는 파이프라인 구성
                        </li>
                        <li>
                          Nest.js 프레임워크를 이용해 클린 아키텍처 개념 적용
                        </li>
                        <li>
                          스터디 매칭을 위해, DBSCAN 알고리즘을 응용한
                          클러스터링 알고리즘 구현
                        </li>
                        <li>
                          Redis를 도입하여, Pub/Sub을 이용해 알림 메시지 기능을
                          메시지 큐를 활용하도록 구성
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          Implemented a clustering algorithm for study group
                          matching
                        </li>
                        <li>Optimized MongoDB queries and managed indexes</li>
                      </>
                    )}
                  </ul>
                </div>
                <br />
                {/* 기술 스택(Tech Stack) */}
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "기술 스택" : "Tech Stack"}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
                    {lang === "ko" ? (
                      <>
                        <li>Nest.js</li>
                        <li>MongoDB</li>
                        <li>AWS, Docker</li>
                        <li>Redis</li>
                      </>
                    ) : (
                      <>
                        <li>Nest.js</li>
                        <li>MongoDB</li>
                        <li>AWS, Docker</li>
                        <li>Redis</li>
                      </>
                    )}
                  </ul>
                </div>

                <br />
                {/* 트러블슈팅(Troubleshooting) */}
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "트러블슈팅" : "Troubleshooting"}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
                    {lang === "ko" ? (
                      <>
                        <li>
                          사용자가 증가하며 서버가 예기치 못한 에러가 자주 발생.
                          예외 처리를 위해 에러의 타입을 정의하고, 코드 전반에
                          에러 처리를 위한 코드 추가. ELK 스택을 도입하여 로그를
                          모니터링하고, 빠른 대응이 가능하도록 함.
                        </li>
                        <li>
                          MongoDB query가 느려지며, 문제 발생. populate 연산을
                          줄이고, 리인덱싱 하여 query 속도를 높임.aggregation
                          파이프라인을 활용
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          Resolved server launch delay on AWS (process
                          monitoring and log analysis)
                        </li>
                        <li>
                          Addressed MongoDB concurrency issues by configuring a
                          Replica Set to reduce downtime
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* 회사 카드 #2 */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4 space-y-2">
                {/* 프로젝트 제목/기간/직무 */}
                <h3 className="text-xl font-semibold text-base">
                  {lang === "ko" ? "서울도서이음" : "Seoul Book Connection"}
                </h3>
                <p className="text-md text-gray-500">
                  {lang === "ko"
                    ? "2024.11 ~ 2024.11 | 프론트엔드 개발자"
                    : "Jan 2019 ~ Dec 2021 | Frontend Developer"}
                </p>
                <br />
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "프로젝트 소개" : "Project Introduction"}
                  </h4>
                  <p className="text-md">
                    {lang === "ko"
                      ? "'서울시 공공데이터를 활용해 편의를 제공하는 서비스를 만들기'를 주제로 하는 해커톤 참여. 서울시 도서관에서 제공하는 책이음 서비스와 서울시 도서관의 프로그램을 한눈에 확인할 수 있는 서비스 제작."
                      : "A gathering platform for college students (study, meetups, clubs) with over 400 active users."}
                  </p>
                  <p className="text-blue-500 text-sm">
                    Frontend:{" "}
                    <a
                      href="https://github.com/orgs/UOSHackathon2024/repositories"
                      className="text-blue-500"
                    >
                      {" "}
                      https://github.com/orgs/UOSHackathon2024/repositories
                    </a>
                  </p>
                </div>
                <br />
                {/* 기여도(Contributions) */}
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "기여도" : "Contributions"}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
                    {lang === "ko" ? (
                      <>
                        <li>디자이너와의 협업으로 UI/UX 개선</li>
                        <li>
                          Next.js를 이용한 빠른 프로토타이핑과, 내장된 백엔드
                          기능을 활용한 Cors 문제 해결
                        </li>
                        <li>TailwindCSS를 활용하여 일관성있는 디자인</li>
                      </>
                    ) : (
                      <>
                        <li>
                          Implemented a clustering algorithm for study group
                          matching
                        </li>
                        <li>Optimized MongoDB queries and managed indexes</li>
                      </>
                    )}
                  </ul>
                </div>
                <br />
                {/* 기술 스택(Tech Stack) */}
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "기술 스택" : "Tech Stack"}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
                    {lang === "ko" ? (
                      <>
                        <li>Next.js</li>
                        <li>Tailwindcss</li>
                      </>
                    ) : (
                      <>
                        <li>Next.js</li>
                        <li>Tailwindcss</li>
                      </>
                    )}
                  </ul>
                </div>

                <br />
                {/* 트러블슈팅(Troubleshooting) */}
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "트러블슈팅" : "Troubleshooting"}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
                    {lang === "ko" ? (
                      <>
                        <li>
                          사용자가 증가하며 서버가 예기치 못한 에러가 자주 발생.
                          예외 처리를 위해 에러의 타입을 정의하고, 코드 전반에
                          에러 처리를 위한 코드 추가. ELK 스택을 도입하여 로그를
                          모니터링하고, 빠른 대응이 가능하도록 함.
                        </li>
                        <li>
                          MongoDB query가 느려지며, 문제 발생. populate 연산을
                          줄이고, 리인덱싱 하여 query 속도를 높임.aggregation
                          파이프라인을 활용
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          Resolved server launch delay on AWS (process
                          monitoring and log analysis)
                        </li>
                        <li>
                          Addressed MongoDB concurrency issues by configuring a
                          Replica Set to reduce downtime
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 개인 프로젝트 섹션 */}
          <section className="mb-8 w-full">
            <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "개인 프로젝트" : "Personal Project"}
            </h2>
            <div className="grid gap-4">
              {/* 회사 카드 #1 */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4 space-y-2">
                {/* 프로젝트 제목/기간/직무 */}
                <h3 className="text-xl font-semibold text-base">
                  {lang === "ko" ? "주식 시뮬레이션" : "Stock Simulation"}
                </h3>
                <p className="text-md text-gray-500">
                  {lang === "ko"
                    ? "2024.12 ~ * | 풀스택 개발"
                    : "Dec 2024 ~ * | Fullstack Developer"}
                </p>
                <br />
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "프로젝트 소개" : "Project Introduction"}
                  </h4>
                  <p className="text-md">
                    {lang === "ko"
                      ? "한국투자증권 api를 이용해, 실시간 한국 주식, 미국 주식 데이터를 받아오고 거래 시뮬레이션을 해볼 수 있는 서비스 개발"
                      : "A gathering platform for college students (study, meetups, clubs) with over 400 active users."}
                  </p>
                  <p className="text-blue-500 text-sm">
                    Frontend:{" "}
                    <a
                      href="https://github.com/beming-dev/stock-simulator-front"
                      className="text-blue-500"
                    >
                      {" "}
                      https://github.com/beming-dev/stock-simulator-front
                    </a>
                  </p>
                  <p className="text-blue-500 text-sm">
                    Backend:{" "}
                    <a
                      href="https://github.com/beming-dev/stock-simulator-back"
                      className="text-blue-500"
                    >
                      {" "}
                      https://github.com/beming-dev/stock-simulator-back
                    </a>
                  </p>
                </div>
                <br />
                {/* 기여도(Contributions) */}
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "기여도" : "Contributions"}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
                    {lang === "ko" ? (
                      <>
                        <li>
                          실시간 데이터를 받아오기 위해, 한투api와 백엔드 서버
                          사이의 WebSocket, 백엔드 서버와 클라이언트 사이의
                          WebSocket을 연결하는 아키텍처 구성
                        </li>
                        <li>
                          Oracle cloud와 Jenkins, Gitlab webhook을 이용한 CI/CD
                          파이프라인 구축
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          Implemented a clustering algorithm for study group
                          matching
                        </li>
                        <li>Optimized MongoDB queries and managed indexes</li>
                      </>
                    )}
                  </ul>
                </div>
                <br />
                {/* 기술 스택(Tech Stack) */}
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "기술 스택" : "Tech Stack"}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
                    {lang === "ko" ? (
                      <>
                        <li>Spring</li>
                        <li>MySQL</li>
                        <li>React.js</li>
                        <li>tailwindCSS</li>
                      </>
                    ) : (
                      <>
                        <li>Spring</li>
                        <li>MySQL</li>
                        <li>React.js</li>
                        <li>tailwindCSS</li>
                      </>
                    )}
                  </ul>
                </div>

                <br />
                {/* 트러블슈팅(Troubleshooting) */}
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "트러블슈팅" : "Troubleshooting"}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
                    {lang === "ko" ? (
                      <>
                        <li>
                          사용자가 증가하며 서버가 예기치 못한 에러가 자주 발생.
                          예외 처리를 위해 에러의 타입을 정의하고, 코드 전반에
                          에러 처리를 위한 코드 추가. ELK 스택을 도입하여 로그를
                          모니터링하고, 빠른 대응이 가능하도록 함.
                        </li>
                        <li>
                          MongoDB query가 느려지며, 문제 발생. populate 연산을
                          줄이고, 리인덱싱 하여 query 속도를 높임.aggregation
                          파이프라인을 활용
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          Resolved server launch delay on AWS (process
                          monitoring and log analysis)
                        </li>
                        <li>
                          Addressed MongoDB concurrency issues by configuring a
                          Replica Set to reduce downtime
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 기술 스택 섹션 */}
          <section className="mb-8 w-full">
            <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "기술 스택" : "Skills"}
            </h2>
            <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
              <div className="flex flex-wrap gap-2">
                {/* 각각의 박스 */}
                <div className="w-full flex flex-col justify-between space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="self-center w-24">Frontend</span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 mt-0">
                      Tailwind.css
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      React.js
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      Next.js
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="self-center w-24">Backend</span>
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
                  <div className="flex items-center space-x-2">
                    <span className="self-center w-24">Database</span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      MySQL
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      MongoDB
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="self-center w-24">Etc.</span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      Docker
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      Git
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 공부중인것 섹션 */}
          <section className="mb-8 w-full">
            <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "공부중인것" : "Studying"}
            </h2>
            <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
              <ul className="text-sm text-gray-700">
                <li className="text-black text-md">Redis</li>
                <li className="text-black text-md">Kafka</li>
              </ul>
            </div>
          </section>

          {/* 기타 섹션 */}
          <section className="w-full">
            <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "기타" : "Etc."}
            </h2>
            <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
              <h3 className="font-semibold text-base">
                {lang === "ko" ? "교환학생" : "Exchange Student"} | The Hague
                University of Applied Sciences
              </h3>
              <p className="text-sm text-gray-500">2023.08 ~ 2024.02</p>
              <ul className="text-sm text-gray-700 mt-2">
                <li>Becoming the Next successful online startup 수업 수강</li>
                <li>
                  온라인 스타트업을 시작하기 위해 거쳐야하는 과정들을 직접
                  서비스를 제작하며 경험
                </li>
                <li>
                  Next.js와 Next.js api를 이용해 헬스케어 온라인 스타트업
                  프로토타입 개발
                </li>
              </ul>
            </div>
            <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
              <h3 className="font-semibold text-base">TOEIC (875/990)</h3>
              <p className="text-sm text-gray-500">2024.02</p>
            </div>
            {/* <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
              <h3 className="font-semibold text-base">
                {lang === "ko" ? "정보처리기사" : "Exchange Student"}
              </h3>
              <p className="text-sm text-gray-500">2025.02</p>
            </div> */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
