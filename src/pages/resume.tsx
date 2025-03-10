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
    <div className="resume flex justify-center items-center bg-gray-50 min-h-screen py-8">
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
                <a
                  href="https://github.com/beming-dev"
                  className="underline hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/beming-dev
                </a>
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
                  <br />
                  <p className="text-blue-500 text-sm mt-3">
                    사이트 주소:{" "}
                    <a
                      href="https://study-about.club/"
                      className="underline hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://study-about.club/
                    </a>
                  </p>
                  <p className="text-blue-500 text-sm mt-3">
                    Backend:{" "}
                    <a
                      href="https://github.com/AboutClan/nest-back"
                      className="underline hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://github.com/AboutClan/nest-back
                    </a>
                  </p>
                  <p className="text-blue-500 text-sm">
                    Frontend:{" "}
                    <a
                      href="https://github.com/AboutClan/About"
                      className="underline hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://github.com/AboutClan/About
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
                          Nest.js 프레임워크를 이용해 클린 아키텍처 개념 적용
                        </li>
                        <li>
                          Filebeat, ElasticSearch, Logstash, Kibana를
                          Docker-compose로 묶어 Docker container의 로그를
                          시각화하는 파이프라인 구성
                          <a href="https://beming-dev.github.io/blog/about/elk/">
                            [블로그]
                          </a>
                        </li>
                        <li>
                          AWS codepipeline을 이용해 EC2에 Docker container로
                          프론트엔드, 백엔드를 배포하는 CI/CD 파이프라인 구성
                          <a href="https://beming-dev.github.io/blog/about/pipeline/">
                            [블로그]
                          </a>
                        </li>
                        <li>
                          스터디 매칭을 위해, DBSCAN 알고리즘을 응용한
                          클러스터링 알고리즘 구현
                          <a href="https://beming-dev.github.io/blog/about/clustering/">
                            [블로그]
                          </a>
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
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            Nest.js
                          </span>
                          <span>
                            를 도입하여 DI/DIP 개념을 적용함으로써
                            데이터베이스의 결합도를 낮추고 유지보수성을
                            개선했습니다.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            MongoDB
                          </span>
                          <span>
                            를 활용하여 스키마 변경이 잦은 데이터 모델에
                            유연하게 대응할 수 있도록 설계했습니다.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            AWS
                          </span>
                          <span>
                            에 배포를 구성하여 배포 비용을 절감하고, 다양한
                            기능을 사용해보았습니다.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            Docker
                          </span>
                          <span>
                            를 활용하여 애플리케이션을 컨테이너화하고, 일관된
                            개발 및 배포 환경을 유지하고 있습니다.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            Redis
                          </span>
                          <span>
                            를 메시지 큐로 활용해 알림 서비스를 운영하고
                            있습니다.
                          </span>
                        </li>
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
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># 문제 상황</div>
                          <div className="mt-1">
                            사용자가 증가하며 서버에 예기치 못한 에러가 자주
                            발생하고 종료되는 일 발생
                          </div>
                          <div className="font-semibold mt-2"># 해결 방법</div>
                          <div className="mt-1">
                            발생 가능한 예외 상황에 대해 에러 타입을 명시적으로
                            정의하고, 코드 전반에 걸쳐 체계적인 예외 처리를
                            추가하여 안정성을 높임.
                          </div>
                          <div className="mt-1">
                            ELK 스택(Elasticsearch, Logstash, Kibana)을 도입하여
                            로그를 중앙 집중식으로 관리, 모니터링함으로써 문제
                            발생 시 신속하게 원인을 파악하고 대응
                          </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># 문제 상황</div>
                          <div className="mt-1">
                            MongoDB 쿼리 성능 저하로 인해 데이터 검색 및 응답
                            속도가 현저히 느려지는 문제가 발생
                          </div>
                          <div className="font-semibold mt-2"># 해결 방법</div>
                          <div className="mt-1">
                            불필요한 populate 연산을 최소화하고, 리인덱싱을 통해
                            데이터베이스 인덱스를 재구성하여 쿼리 처리 속도를
                            향상
                          </div>
                          <div className="mt-1">
                            MongoDB의 aggregation 파이프라인 기능을 적극적으로
                            활용하여 복잡한 데이터 처리 로직을 최적화함으로써
                            응답 속도를 개선
                          </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># 문제 상황</div>
                          <div className="mt-1">
                            사용자가 증가하며 RAM 사용량도 증가하고, Heroku의
                            높은 비용을 감당하기 어려워짐
                          </div>
                          <div className="font-semibold mt-2"># 해결 방법</div>
                          <div className="mt-1">
                            AWS에서 EC2인스턴스를 대여하고, Codepipeline을
                            사용해 Github의 코드를 트래킹하여 Docker Container로
                            배포하는 CI/CD pipeline 구성
                          </div>
                          <div className="mt-1">
                            기존 Heroku 배포 방식보다 높은 RAM을 사용하며, 매달
                            100달러 가량의 비용 절감
                          </div>
                        </div>
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
                      ? `'서울시 공공데이터를 활용해 편의를 제공하는 서비스를 만들기'를 주제로 하는 해커톤에 참여했습니다. 
                      서울시 도서관에서 제공하는 책이음 서비스와 서울시 도서관의 프로그램을 한눈에 확인할 수 있는 서비스 제작했습니다.`
                      : "A gathering platform for college students (study, meetups, clubs) with over 400 active users."}
                  </p>
                  <br />
                  <p className="text-blue-500 text-sm">
                    사이트주소:{" "}
                    <a
                      href="https://uos-hackathon-static.vercel.app/"
                      className="text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      https://uos-hackathon-static.vercel.app/
                    </a>
                    <p className="text-black text-sm">
                      * 해커톤 종료후, api연결을 끊고 데이터를 하드코딩하여 무료
                      배포해두었습니다. 사이트의 접속, 혹은 일부 기능이 원활하지
                      않을 수 있습니다.
                    </p>
                  </p>
                  <p className="text-blue-500 text-sm">
                    Frontend:{" "}
                    <a
                      href="https://github.com/orgs/UOSHackathon2024/repositories"
                      className="text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
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
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            Next.js
                          </span>
                          <span>
                            를 사용하여 API 라우팅 기능을 사용해 간단한 서버
                            기능을 처리하고, 효율적인 개발을 했습니다.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            Tailwindcss
                          </span>
                          <span>
                            를 사용하여 유틸리티 기반 스타일링 으로 일관된
                            디자인을 유지하면서도 개발 속도를 향상시켰습니다.
                          </span>
                        </li>
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
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># 문제 상황</div>
                          <div className="mt-1">
                            서울시 공공데이터 API를 클라이언트 측에서 직접
                            호출하려 하니, CORS 정책 때문에 데이터를 정상적으로
                            받지 못함
                          </div>
                          <div className="font-semibold mt-2"># 해결 방법</div>
                          <div className="mt-1">
                            Next.js의 API Routes를 사용하여 백엔드 프록시
                            레이어를 구현
                          </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># 문제 상황</div>
                          <div className="mt-1">
                            도서관 프로그램 추천 기능을 해커톤 시간 내에 구현이
                            어려운 상황에 직면
                          </div>
                          <div className="font-semibold mt-2"># 해결 방법</div>
                          <div className="mt-1">
                            생성형 AI API를 사용하여 적절한 프롬프팅과 응답을
                            파싱하여 빠르게 추천 시스템 구현
                          </div>
                        </div>
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
                      ? "한국투자증권 api를 이용해, 실시간 한국 주식, 미국 주식 데이터를 받아오고 거래 시뮬레이션을 해볼 수 있는 서비스를 개발했습니다."
                      : "A gathering platform for college students (study, meetups, clubs) with over 400 active users."}
                  </p>
                  <br />
                  <p className="text-blue-500 text-sm">
                    사이트주소:{" "}
                    <a
                      href="https://beming-stock.kro.kr/"
                      className="text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      https://beming-stock.kro.kr/
                    </a>
                    <p className="text-black text-sm">
                      * Ram 1GB 인스턴스에 Docker를 사용하고 있어, 사이트가
                      느리게 작동할 수 있습니다. 특히 초기 데이터 로딩때 많은
                      시간이 소요됩니다.
                    </p>
                  </p>
                  <p className="text-blue-500 text-sm">
                    Frontend:{" "}
                    <a
                      href="https://github.com/beming-dev/stock-simulator-front"
                      className="text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
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
                      target="_blank"
                      rel="noopener noreferrer"
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
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            Spring
                          </span>
                          <span>
                            을 사용하여 유지보수성과 확장성을 고려한 백엔드를
                            구축했습니다.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            MySQL
                          </span>
                          <span>
                            를 사용하여 정규화된 데이터 모델을 설계하고, 인덱싱
                            및 쿼리 최적화를 통해 성능을 개선했습니다.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            React.js
                          </span>
                          <span>
                            를 사용하여 컴포넌트 기반 UI를 설계하고, 상태 관리를
                            효율적으로 처리하여 사용자 경험을 최적화했습니다.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            tailwindCSS
                          </span>
                          <span>
                            를 사용하여 유틸리티 기반 스타일링 으로 일관된
                            디자인을 유지하면서도 개발 속도를 향상시켰습니다.
                          </span>
                        </li>
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
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># 문제 상황</div>
                          <div className="mt-1">
                            초기에 WebSocket 연결이 늘어날수록 데이터 전송이
                            지연되고, 중복 전송되는 문제가 발생
                          </div>
                          <div className="font-semibold mt-2"># 해결 방법</div>
                          <div className="mt-1">
                            같은 데이터를 요청하는 WebSocket 연결을 그룹화하고,
                            데이터가 들어올 때 Event를 활용한 브로드캐스트
                            방식으로 각 클라이언트에 전송하도록 구성하여 지연과
                            중복 전송 문제를 해결
                          </div>
                          <a
                            href="https://beming-dev.github.io/blog/stock-simulator/websocket/"
                            className="blog-link"
                          >
                            [블로그]
                          </a>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># 문제 상황</div>
                          <div className="mt-1">
                            Oracle Cloud에 배포된 인스턴스에서 Jenkins 서버를
                            구동하고, GitLab Webhook을 통해 빌드-배포 자동화를
                            구축하려 했으나, 초기 설정 시 네트워크 보안 그룹
                            혹은 방화벽 설정 누락으로 인해 Webhook이 Jenkins에
                            도달하지 못하거나, Docker 등 컨테이너 환경에서
                            필요한 포트가 제대로 오픈되지 않아 배포 자동화가
                            실패하는 문제 발생.
                          </div>
                          <div className="font-semibold mt-2"># 해결 방법</div>
                          <div className="mt-1">
                            Oracle Cloud VM 인스턴스의 보안
                            규칙(Inbound/Outbound Rules)과 Jenkins가 사용하는
                            포트를 정확히 허용.
                          </div>
                          <div className="mt-1">
                            GitLab 프로젝트 설정에서 Webhook URL을 설정하고,
                            정상적으로 HTTP 200 응답을 받는지 테스트.
                          </div>
                        </div>
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
            <div className="bg-white shadow-sm border border-gray-200 rounded-md">
              <div className="flex flex-wrap gap-2">
                {/* 각각의 박스 */}
                <div className="w-full max-w-screen-lg mx-auto py-2 px-2">
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
                  <div className="grid grid-cols-1 gap-6">
                    {/* Backend Card */}
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-xl font-semibold mb-4">Backend</h3>
                      {/* Express.js */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          Express.js
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            Node.js 기반의 경량 프레임워크로 RESTful API 서버를
                            구축한 경험이 있습니다.
                          </li>
                          <li>
                            미들웨어를 활용해 인증/권한 처리, 로깅 등을 유연하게
                            구성합니다.
                          </li>
                          <li>
                            Express.js의 Error Handling 과정을 이해하고 있고,
                            Custom Error Handler를 구성할 수 있습니다.
                            <a href="https://beming-dev.github.io/blog/about/error/">
                              [블로그]
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* Nest.js */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          Nest.js
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            모듈(Module) 구조와 의존성 주입(Dependency
                            Injection) 등을 활용해 아키텍처를 설계합니다.
                          </li>
                          <li>
                            데코레이터 기반으로 라우팅, 파이프, 가드 등을 설정해
                            유연하고 확장성 있는 API를 구성해본 경험이 있습니다.
                          </li>
                        </ul>
                      </div>
                      {/* Spring */}
                      <div>
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          Spring
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            Spring Boot를 사용하여 MVC 아키텍처로 웹
                            애플리케이션을 구축한 경험이 있습니다.
                          </li>
                          <li>
                            스프링 DI/IoC 컨테이너를 통해 객체 의존성을
                            관리하고, AOP로 공통 기능을 추상화합니다.
                          </li>
                          <li>
                            JPA/Hibernate 등 ORM 기술을 사용해 데이터베이스 연동
                            및 트랜잭션 관리를 구현해본 경험이 있습니다.
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Frontend Card */}
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-xl font-semibold mb-4">Frontend</h3>
                      {/* React.js */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          React.js
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            함수형 컴포넌트 및 React Hooks를 능숙하게
                            활용합니다.
                          </li>
                          <li>
                            Redux, Recoil을 사용해 전역 상태를 효율적으로
                            관리해본 경험이 있습니다.
                          </li>
                          <li>
                            컴포넌트 구조 설계와 재사용성을 고려한 UI 개발에
                            익숙합니다.
                          </li>
                        </ul>
                      </div>
                      {/* TailwindCSS */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          Tailwind.css
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            Utility-First 기반으로 빠르게 UI를 구현하고, 일관된
                            디자인 시스템을 유지할 수 있습니다.
                          </li>
                          <li>
                            Tailwind.config 설정을 통해 테마(색상, 폰트 등)를
                            커스터마이징해본 경험이 있습니다.
                          </li>
                          <li>
                            반응형 디자인을 손쉽게 적용해 다양한 해상도에 맞춰
                            스타일링할 수 있습니다.
                          </li>
                        </ul>
                      </div>
                      {/* Next.js */}
                      <div>
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          Next.js
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            Server-Side Rendering(SSR), Static Site
                            Generation(SSG) 등 다양한 렌더링 방식을 활용할 수
                            있습니다.
                          </li>
                          <li>
                            파일 기반 라우팅과 API Routes로 백엔드 로직을
                            구성해본 경험이 있습니다.
                          </li>
                          <li>
                            getServerSideProps, getStaticProps를 이용해 성능과
                            SEO를 고려한 프로젝트를 진행해본 경험이 있습니다.
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Database Card */}
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-xl font-semibold mb-4">Database</h3>
                      {/* MySQL */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          MySQL
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            인덱스를 활용하여 성능 최적화를 진행해본 경험이
                            있으며, Join을 효율적으로 사용하는 방법을 잘 알고
                            있습니다.
                          </li>
                          <li>
                            트랜잭션과 락(Lock) 메커니즘을 이해하고 있으며,
                            데이터 무결성 유지를 위한 다양한 기법을
                            적용해보았습니다.
                          </li>
                        </ul>
                      </div>
                      {/* MongoDB */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          MongoDB
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            Document 기반 비관계형 DB로, 스키마가 유연한
                            프로젝트에서 활용해본 경험이 있습니다.
                          </li>
                          <li>
                            Aggregation을 사용해 복잡한 데이터 처리 로직을
                            효율적으로 구현할 수 있습니다.
                          </li>
                        </ul>
                      </div>
                      {/* Redis */}
                      <div>
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          Redis
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          {/* <li>
                            인메모리 캐싱을 활용해 DB 부하 감소 및 애플리케이션
                            응답 속도를 최적화해본 경험이 있습니다.
                          </li> */}
                          <li>
                            Pub/Sub 기능을 이용해 실시간 메시징 구조를 구축해본
                            경험이 있습니다.
                            <a
                              href="https://beming-dev.github.io/blog/about/pubsub/"
                              className="blog-link"
                            >
                              [블로그]
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Etc. Card */}
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-xl font-semibold mb-4">Etc.</h3>
                      {/* Docker */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          Docker
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            Dockerfile을 작성하여 애플리케이션 환경을 이미지로
                            빌드하고, 컨테이너로 배포한 경험이 있습니다.
                          </li>
                          <li>
                            Docker Compose를 이용해 DB, 백엔드, 프론트엔드 등
                            여러 컨테이너 환경을 오케스트레이션해본 경험이
                            있습니다.
                          </li>
                          <li>
                            CI/CD 파이프라인에서 Docker 이미지를 생성, 배포해본
                            경험이 있어 자동화에 능숙합니다.
                          </li>
                        </ul>
                      </div>
                      {/* Git */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          Git
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            Git-flow 전략 등을 통해 협업 시 브랜치 및 릴리즈
                            관리를 체계적으로 해본 경험이 있습니다.
                          </li>
                          <li>
                            Pull Request 기반 코드 리뷰와 Github Issues 연동으로
                            작업 관리를 진행해본 경험이 있습니다.
                          </li>
                        </ul>
                      </div>
                    </div>
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
              <p className="text-sm text-gray-500">2023.02</p>
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
