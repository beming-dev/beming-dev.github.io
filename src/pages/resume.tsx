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
                  채민관 (Chae Mingwan)
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
              <p className="text-sm text-black leading-relaxed">
                {lang === "ko" ? (
                  <>
                    코드 간 의존성을 낮추어 유지 보수가 쉬운 아키텍처를 설계하기
                    위해 고민하고,
                    <br />
                    사용자의 요구사항과 의사소통을 중요시하는 개발자 채민관
                    입니다.
                  </>
                ) : (
                  <>
                    I am developer Chae Min Gwan who carefully considers
                    designing an architecture that lowers code dependencies for
                    easier maintenance, and who places great importance on user
                    requirements and communication.
                  </>
                )}
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

          {/* 경력 섹션 */}
          <section className="mb-8 w-full">
            <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">
              {lang === "ko" ? "경력" : "Career"}
            </h2>
            <div className="grid gap-4">
              {/* 회사 카드 #1 */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4 space-y-2">
                {/* 프로젝트 제목/기간/직무 */}
                <h3 className="text-xl font-semibold text-base">
                  {lang === "ko" ? "코딧" : "CODIT"}
                  <a
                    href="https://beming-dev.github.io/subCategory/codit/"
                    className="blog-link text-sm font-semibold ml-2"
                  >
                    [블로그]
                  </a>
                </h3>
                <p className="text-md text-gray-500">
                  {lang === "ko"
                    ? "2025.03 ~ 2025.07 | 백엔드 인턴"
                    : "Mar 2025 ~ Aug 2025 | Backend Internship"}
                </p>
                <br />
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "소개" : "Introduction"}
                  </h4>
                  <p className="text-md">
                    {lang === "ko"
                      ? `기업에게 법·규제·정책 솔루션을 제공하는 B2B 스타트업입니다.`
                      : ""}
                    <br />
                    {lang === "ko"
                      ? `API 개발, 알림 서버, 크롤링, Opensearch 인덱싱 등 다양한 부분을 경험하고 서비스에 기여했습니다.`
                      : ""}
                  </p>
                  <br />
                  <p className="text-blue-500 text-sm mt-3">
                    사이트 주소:{" "}
                    <a
                      href="https://thecodit.com/kr-ko"
                      className="underline hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://thecodit.com
                    </a>
                  </p>
                </div>
                <br />
                {/* 기여도(Contributions) */}
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "배운것" : "What I learned"}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
                    {lang === "ko" ? (
                      <>
                        <li>
                          애자일 개발 프로세스 하에서 2~3주 단위의 스프린트를
                          운영하고, 매일 스크럼 회의를 통해 진행 상황을 공유하며
                          신속하게 이슈를 해결하는 방법을 경헙했습니다.
                        </li>
                        <li>
                          Jira, Confluence, Slack 등 다양한 협업 도구를 활용하여
                          팀원들과의 원활한 소통과 협업을 경험했습니다.
                        </li>
                        <li>
                          실제 운영 중인 프로덕션 코드베이스를 직접 다루며 코드
                          이해력과 문제 해결 역량을 강화했습니다.
                        </li>
                        <li>
                          수백만 건 규모의 데이터를 Opensearch에 인덱싱하여,
                          인덱스 구조 최적화와 단계별 캐싱 전략을 적용함으로써
                          검색 쿼리 성능을 향상시켰습니다.
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          Applied Clean Architecture principles using the
                          Nest.js framework
                        </li>
                        <li>
                          Configured a pipeline for visualizing Docker container
                          logs by integrating Filebeat, Elasticsearch, Logstash,
                          and Kibana with Docker Compose{" "}
                          <a
                            href="https://beming-dev.github.io/blog/about/elk/"
                            className="blog-link"
                          >
                            [Blog]
                          </a>
                        </li>
                        <li>
                          Built a CI/CD pipeline on AWS CodePipeline to deploy
                          both frontend and backend to EC2 via Docker containers{" "}
                          <a
                            href="https://beming-dev.github.io/blog/about/pipeline/"
                            className="blog-link"
                          >
                            [Blog]
                          </a>
                        </li>
                        <li>
                          Implemented a clustering algorithm based on DBSCAN for
                          study matching{" "}
                          <a
                            href="https://beming-dev.github.io/blog/about/clustering/"
                            className="blog-link"
                          >
                            [Blog]
                          </a>
                        </li>
                        <li>
                          Introduced Redis to reduce API response times via
                          caching and to utilize its messaging queue
                          capabilities for notifications <br />
                          <a
                            href="https://beming-dev.github.io/blog/about/caching/"
                            className="blog-link"
                          >
                            [Caching Blog]
                          </a>{" "}
                          <a
                            href="https://beming-dev.github.io/blog/about/caching/"
                            className="blog-link"
                          >
                            [Message Queue Blog]
                          </a>
                        </li>
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
                            Express.js
                          </span>
                          <span>
                            를 사용해 RESTful API 서버를 설계·개발했습니다.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            MySQL
                          </span>
                          <span>
                            을 기반으로 복잡한 조인 쿼리와 인덱스 튜닝을 통해
                            데이터베이스 성능을 최적화했습니다.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            AirFlow
                          </span>
                          <span>
                            를 활용해 ETL 워크플로우를 정의하고, 스케줄러를 통해
                            배치 작업 자동화를 구현했습니다.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            Opensearch
                          </span>
                          <span>
                            를 사용해 데이터 인덱싱 및 검색 인프라를
                            구축했습니다.
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
              </div>
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
                  <a
                    href="https://beming-dev.github.io/subCategory/about/"
                    className="blog-link text-sm font-semibold ml-2"
                  >
                    [블로그]
                  </a>
                </h3>
                <p className="text-md text-gray-500">
                  {lang === "ko"
                    ? "2023.01 ~ 현재 | 백엔드 개발자"
                    : "Jun 2022 ~ Present | Backend Developer"}
                </p>
                <br />
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1">
                    {lang === "ko" ? "프로젝트 소개" : "Project Introduction"}
                  </h4>
                  <p className="text-md">
                    {lang === "ko"
                      ? "대학생을 위한 모임 플랫폼 서비스입니다. 스터디, 번개 모임, 소모임 등의 기능을 제공하며, 현재 google analytics 기준 400명 정도의 DAU(Daily Active User)를 유지하고 있습니다."
                      : "A platform designed for college students, offering features like study groups, instant meetups, and small clubs. Currently, it maintains around 400 Daily Active Users (based on Google Analytics)."}
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
                    <p className="text-black text-sm">
                      접속하여, 게스트 로그인을 클릭해 사이트를 체험할 수
                      있습니다.
                    </p>
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
                          <a
                            href="https://beming-dev.github.io/blog/about/clean/"
                            className="blog-link"
                          >
                            [블로그]
                          </a>
                        </li>
                        <li>
                          도메인 주도 개발을 적용하기 위한 리팩토링을 진행
                        </li>
                        <li>
                          Filebeat, ElasticSearch, Logstash, Kibana를
                          Docker-compose로 묶어 Docker container의 로그를
                          시각화하는 파이프라인 구성
                          <a
                            href="https://beming-dev.github.io/blog/about/elk/"
                            className="blog-link"
                          >
                            [블로그]
                          </a>
                        </li>
                        <li>
                          AWS codepipeline을 이용해 EC2에 Docker container로
                          프론트엔드, 백엔드를 배포하는 CI/CD 파이프라인 구성
                          {/* <a
                            href="https://beming-dev.github.io/blog/about/pipeline/"
                            className="blog-link"
                          >
                            [블로그]
                          </a> */}
                        </li>
                        <li>
                          스터디 매칭을 위해, DBSCAN 알고리즘을 응용한
                          클러스터링 알고리즘 구현
                          <a
                            href="https://beming-dev.github.io/blog/about/clustering/"
                            className="blog-link"
                          >
                            [블로그]
                          </a>
                        </li>
                        <li>
                          Redis를 도입하여, 캐싱을 사용해 api 응답속도를 줄이고,
                          알림 서비스의 메시지 큐로 활용
                          <a
                            href="https://beming-dev.github.io/blog/about/pubsub/"
                            className="blog-link"
                          >
                            [블로그]
                          </a>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          Applied Clean Architecture principles using the
                          Nest.js framework
                        </li>
                        <li>
                          Configured a pipeline for visualizing Docker container
                          logs by integrating Filebeat, Elasticsearch, Logstash,
                          and Kibana with Docker Compose{" "}
                          <a
                            href="https://beming-dev.github.io/blog/about/elk/"
                            className="blog-link"
                          >
                            [Blog]
                          </a>
                        </li>
                        <li>
                          Built a CI/CD pipeline on AWS CodePipeline to deploy
                          both frontend and backend to EC2 via Docker containers{" "}
                          <a
                            href="https://beming-dev.github.io/blog/about/pipeline/"
                            className="blog-link"
                          >
                            [Blog]
                          </a>
                        </li>
                        <li>
                          Implemented a clustering algorithm based on DBSCAN for
                          study matching{" "}
                          <a
                            href="https://beming-dev.github.io/blog/about/clustering/"
                            className="blog-link"
                          >
                            [Blog]
                          </a>
                        </li>
                        <li>
                          Introduced Redis to reduce API response times via
                          caching and to utilize its messaging queue
                          capabilities for notifications <br />
                          <a
                            href="https://beming-dev.github.io/blog/about/caching/"
                            className="blog-link"
                          >
                            [Caching Blog]
                          </a>{" "}
                          <a
                            href="https://beming-dev.github.io/blog/about/caching/"
                            className="blog-link"
                          >
                            [Message Queue Blog]
                          </a>
                        </li>
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
                            를 메시지큐와 캐싱기능을 위해 사용하고 있습니다.
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
                {/* 트러블슈팅(Troubleshooting) */}
                <div>
                  <h4 className="text-lg font-semibold border-b pb-1 mt-8">
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
                            정의하고, 코드 전반에 걸쳐 체계적인 예외 처리 로직을
                            정비하여 안정성을 높였습니다.
                          </div>
                          <div className="mt-1">
                            ELK 스택(Elasticsearch, Logstash, Kibana) +
                            Filebeat을 도입하여 로그를 중앙 집중식으로 관리,
                            모니터링함으로써 문제 발생 시 신속하게 원인을
                            파악하고 대응하고 있습니다.
                          </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># 문제 상황</div>
                          <div className="mt-1">
                            초기 페이지 렌더링에서, 로딩 속도가 느려져 사용자
                            경험이 안좋아지는 상황 발생
                          </div>
                          <div className="font-semibold mt-2"># 해결 방법</div>
                          <div className="mt-1">
                            MongoDB에서, 불필요한 populate 연산을 최소화하고,
                            인덱싱을 통해 데이터베이스 인덱스를 재구성하여 쿼리
                            처리 속도를 향상했습니다.
                          </div>
                          <div className="mt-1">
                            ELK스택을 사용해 시간이 오래 걸리는 API를 시각화하여
                            찾아내고, Redis 캐싱 기능을 이용해 해당 API를
                            캐싱하여, 최종적으로는 데이터 처리속도를 절반 가량
                            줄였습니다.
                            <a
                              href="https://beming-dev.github.io/blog/about/caching/"
                              className="blog-link ml-2"
                            >
                              [블로그]
                            </a>
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
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># Issue</div>
                          <div className="mt-1">
                            As the user base grew, the server frequently
                            encountered unexpected errors and occasionally shut
                            down.
                          </div>
                          <div className="font-semibold mt-2"># Solution</div>
                          <div className="mt-1">
                            Explicitly defined error types for potential
                            exceptions and revamped the overall exception
                            handling logic to increase stability.
                          </div>
                          <div className="mt-1">
                            Adopted the ELK stack (Elasticsearch, Logstash,
                            Kibana) with Filebeat for centralized log management
                            and monitoring, enabling quick identification and
                            resolution of issues.
                          </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># Issue</div>
                          <div className="mt-1">
                            MongoDB query performance deteriorated due to the
                            increasing data volume, significantly slowing down
                            both data retrieval and response time.
                          </div>
                          <div className="font-semibold mt-2"># Solution</div>
                          <div className="mt-1">
                            Minimized unnecessary populate operations and
                            reorganized database indexes to improve query
                            processing speed.
                          </div>
                          <div className="mt-1">
                            Leveraged MongoDB’s aggregation pipeline to optimize
                            complex data processing, thus enhancing overall
                            response times.
                          </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># Issue</div>
                          <div className="mt-1">
                            As the number of users increased, RAM usage
                            skyrocketed, making Heroku’s costs unsustainable.
                          </div>
                          <div className="font-semibold mt-2"># Solution</div>
                          <div className="mt-1">
                            Migrated to AWS EC2 instances and used CodePipeline
                            to track GitHub commits and deploy the Docker
                            containers through a CI/CD pipeline.
                          </div>
                          <div className="mt-1">
                            This approach provided higher RAM capacity and
                            reduced monthly costs by roughly 100 USD compared to
                            the previous Heroku setup.
                          </div>
                        </div>
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
              {/* 개인프로젝트 #1 */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4 space-y-2">
                {/* 프로젝트 제목/기간/직무 */}
                <h3 className="text-xl font-semibold text-base">
                  {lang === "ko" ? "주식 시뮬레이션" : "Stock Simulation"}
                  <a
                    href="https://beming-dev.github.io/subCategory/stock-simulator/"
                    className="blog-link text-sm font-semibold ml-2"
                  >
                    [블로그]
                  </a>
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
                      : "Developed a service that utilizes the Korea Investment & Securities API to fetch real-time Korean and US stock data, allowing users to simulate trades."}
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
                        <li>
                          kubernetes와 argoCD를 이용한 배포 자동화를 적용해보고,
                          서비스의 가용성을 높였습니다.
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          Designed an architecture that connects WebSockets
                          between the Korea Investment & Securities API and the
                          backend, as well as between the backend and the
                          client, for real-time data handling
                        </li>
                        <li>
                          Built a CI/CD pipeline using Oracle Cloud, Jenkins,
                          and GitLab webhooks
                        </li>
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
                            를 사용하여 정규화된 데이터 모델을 설계하고,
                            인덱싱과 다양한 쿼리를 경험해봤습니다.
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
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            Spring
                          </span>
                          <span>
                            Built a backend with an emphasis on maintainability
                            and scalability.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            MySQL
                          </span>
                          <span>
                            Designed a normalized data model and gained
                            experience with indexing and various queries.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            React.js
                          </span>
                          <span>
                            Developed a component-based UI and effectively
                            handled state management to optimize user
                            experience.
                          </span>
                        </li>
                        <li>
                          <span className="inline-block px-3 py-1 text-xs text-black font-semibold mr-2">
                            tailwindCSS
                          </span>
                          <span>
                            Used a utility-first approach for consistent design
                            and faster development.
                          </span>
                        </li>
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
                            중복 전송 문제를 해결했습니다.
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
                            포트를 허용했습니다.
                          </div>
                          <div className="mt-1">
                            GitLab 프로젝트 설정에서 Webhook URL을 설정하고,
                            정상적으로 HTTP 200 응답을 받는지 테스트했습니다.
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># Issue</div>
                          <div className="mt-1">
                            As the number of WebSocket connections increased,
                            data transmission became delayed and some data was
                            sent redundantly.
                          </div>
                          <div className="font-semibold mt-2"># Solution</div>
                          <div className="mt-1">
                            Grouped WebSocket connections that requested the
                            same data, then used event-based broadcasting to
                            deliver updates to each client, resolving the delay
                            and duplication issues.
                          </div>
                          <a
                            href="https://beming-dev.github.io/blog/stock-simulator/websocket/"
                            className="blog-link"
                          >
                            [Blog]
                          </a>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                          <div className="font-semibold"># Issue</div>
                          <div className="mt-1">
                            Attempted to run a Jenkins server on an Oracle Cloud
                            instance and integrate GitLab Webhooks for automated
                            build/deployment, but the pipeline failed due to
                            missing network security group/firewall settings.
                            Webhook requests never reached Jenkins, and the
                            necessary ports for Docker containers were not open.
                          </div>
                          <div className="font-semibold mt-2"># Solution</div>
                          <div className="mt-1">
                            Allowed Jenkins ports and configured
                            Inbound/Outbound rules on the Oracle Cloud VM
                            instance.
                          </div>
                          <div className="mt-1">
                            Set up the Webhook URL in the GitLab project
                            settings, testing to ensure HTTP 200 responses were
                            received successfully.
                          </div>
                        </div>
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
                            <a
                              href="https://beming-dev.github.io/blog/about/error/"
                              className="blog-link"
                            >
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
                            클린아키텍처 구조를 따르기 위해 노력하고, 코드간
                            의존성을 제거하기 위해 노력합니다.
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
                            관계형 데이터베이스를 설계하고 정규화 할 수
                            있습니다.
                          </li>
                          <li>
                            인덱스를 활용한 성능 최적화, Join을 효율적으로
                            사용하는 방법을 잘 알고 있습니다.
                          </li>
                          <li>
                            트랜잭션과 락(Lock) 메커니즘을 이해하고 있으며,
                            데이터 무결성 유지를 위한 다양한 기법을
                            알고있습니다.
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
                          <li>
                            Redis에서 제공하는 기본 자료구조에 대해
                            알고있습니다.
                            <a
                              href="https://beming-dev.github.io/subCategory/redis/"
                              className="blog-link"
                            >
                              [블로그]
                            </a>
                          </li>
                          <li>
                            인메모리 캐싱을 활용해 DB 부하 감소 및 애플리케이션
                            응답 속도를 최적화해본 경험이 있습니다.
                            <a
                              href="https://beming-dev.github.io/blog/about/caching/"
                              className="blog-link"
                            >
                              [블로그]
                            </a>
                          </li>
                          <li>
                            Redis를 메시지 큐로 활용해 실시간 메시징 구조를
                            구축해본 경험이 있습니다.
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
                      {/* Kubernetes */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          Kubernetes
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            Kubernetes 클러스터를 구성하고, Pod, Service,
                            Deployment 등의 리소스를 관리해본 경험이 있습니다.
                          </li>
                          <li>
                            ArgoCd를 사용하여 GitOps 방식으로 Kubernetes
                            리소스를 관리하고, 배포 자동화를 구현해본 경험이
                            있습니다.
                          </li>
                        </ul>
                      </div>
                      {/* AWS */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                          AWS
                        </span>
                        <ul className="list-disc ml-3 mt-2 text-sm space-y-1">
                          <li>
                            EC2, S3, RDS 등 AWS 서비스를 활용하여 인프라를
                            구성하고, 배포한 경험이 있습니다.
                          </li>
                          <li>
                            IAM을 통해 사용자 및 권한 관리를 설정하고, 보안
                            그룹을 이용해 네트워크 접근 제어를 구현해본 경험이
                            있습니다.
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
                            rebase와 branch 개념을 이용해 git graph를 깔끔하게
                            관리하는 것에 관심이 있습니다.
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
                <li>
                  {lang === "ko"
                    ? "Becoming the Next successful online startup 수업 수강"
                    : "Took the 'Becoming the Next successful online startup' course"}
                </li>
                <li>
                  {lang === "ko"
                    ? "온라인 스타트업을 시작하기 위해 거쳐야하는 과정들을 직접 서비스를 제작하며 경험"
                    : "Hands-on experience creating a service that covers the steps needed to launch an online startup"}
                </li>
                <li>
                  {lang === "ko"
                    ? "Next.js와 Next.js api를 이용해 헬스케어 온라인 스타트업 프로토타입 개발"
                    : "Developed a healthcare online startup prototype using Next.js and its API features"}
                </li>
              </ul>
            </div>
            <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
              <h3 className="font-semibold text-base">TOEIC (875/990)</h3>
              <p className="text-sm text-gray-500">2023.02</p>
            </div>
            <div className="bg-white shadow-sm border border-gray-200 rounded-md p-4">
              <h3 className="font-semibold text-base">
                {lang === "ko" ? "정보처리기사" : "Exchange Student"}
              </h3>
              <p className="text-sm text-gray-500">2025.06</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
