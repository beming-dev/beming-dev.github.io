import React from "react";
// 아이콘 사용 시: import { FiMail, FiPhone, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';

// 이력서 데이터 (About, Skills 제외)
const resumeData = {
  name: "채민관",
  title: "풀스택 개발자 (Full-Stack Developer)",
  location: "서울, 대한민국",
  email: "mingfordev@gmail.com",
  phone: "010-7107-9301",
  github: "github.com/beming-dev",
  linkedin: "linkedin.com/in/beming-dev",
  experiences: [
    {
      company: "네덜란드 교환학생",
      title: "Becoming the Next successful online startup",
      period: "2023년 8월 - 2024년 2월",
      description: [
        "다양한 문화의 프로젝트를 진행하며, 의사소통 역량 향상",
        "사용자 인터뷰, SWOT 분석, 프로토타입 개발 등 온라인 스타트업을 시작하기 위해 거쳐야하는 과정들을 경험",
        "LLM을 활용한 사용자 맞춤형 운동 루틴 추천 서비스 개발",
      ],
    },
    {
      company: "주식회사코딧",
      title: "백엔드 개발자 (인턴)",
      period: "2025년 3월 - 2025년 7월",
      description: [
        "Node.js 기반의 RESTful API 개발",
        "AirFlow를 활용한 ETL 워크플로우 구축",
        "MySQL을 활용한 데이터베이스 설계 및 최적화",
        "데이터 크롤링 및 OpenSearch 인덱싱",
      ],
    },
  ],
  projects: {
    team: [
      {
        name: "About (백엔드 개발자)",
        description: `
        대학생 스터디 동아리에서 시작한 대학생 모임 플랫폼입니다.
        스터디, 번개 모임, 소모임 등의 기능을 제공하며, 현재 google analytics 기준 400명 정도의 DAU(Daily Active User)를 유지하고 있습니다.
        `,
        stack: "Next.js, Nest.js, MongoDB, AWS, Docker",
        link: "https://study-about.club",
      },
      {
        name: "학교 졸업학점 관리 시스템 (프론트엔드 개발자)",
        description:
          "소프트웨어 공학 수업에서, 학교 학생들이 졸업 학점을 확인할 수 있는 서비스를 개발했습니다.",
        stack: "React, Spring Boot, Nest.js, MySQL, AWS",
      },
    ],
    personal: [
      {
        name: "개인 블로그",
        description:
          "개발 트러블슈팅과 간단한 경험을 기록하는 블로그입니다. Gatsby를 활용하여 자체제작했습니다.",
        stack: "Gatsby, tailwindcss",
        link: "https://beming-dev.github.io",
      },
      {
        name: "주식 시뮬레이션",
        description:
          "주식 가상매매 서비스입니다. 한국투자증권 API를 활용해, WebSocket기반으로 실시간 주식 데이터를 받아오고 가상매매를 할 수 있습니다.",
        stack: "React, Spring Boot, MySQL, AWS, ArgoCD, kubernetes",
        link: "https://beming-stock.kro.kr",
      },
    ],
  },
  education: [
    {
      school: "동원고등학교",
      degree: "인문계",
      period: "2016년 3월 - 2019년 2월",
    },
    {
      school: "서울시립대학교",
      degree: "컴퓨터과학부 학사",
      period: "2019년 3월 - 2026년 2월",
    },
  ],
  certifications: [
    {
      name: "정보처리기사",
      issuer: "한국산업인력공단",
      date: "2025년 6월",
    },
  ],
  languages: [
    {
      lang: "영어",
      level: "일상 회화 가능 (Opic IM2)",
    },
  ],
};

// 섹션 제목 컴포넌트
const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
    {children}
  </h2>
);

// 스킬 태그 컴포넌트 (프로젝트 섹션에서 사용)
const SkillTag = ({ skill }) => (
  <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
    {skill}
  </span>
);

const Resume = () => {
  return (
    // --- [변경] ---
    // 전체 배경 div에 relative 클래스 추가 (버튼 위치 조정을 위해)
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 md:p-12 print:p-0 relative">
      {/* --- [추가] 인쇄 버튼 --- */}
      <button
        onClick={() => window.print()}
        className="
          absolute top-4 right-4 sm:top-8 sm:right-8 md:top-12 md:right-12 
          bg-blue-600 text-white font-bold py-2 px-4 rounded-lg 
          shadow-lg hover:bg-blue-700 transition-colors 
          duration-200 print:hidden
        "
      >
        PDF로 저장 (인쇄)
      </button>
      {/* --- [추가] 끝 --- */}

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
        {/* === 헤더 섹션 === */}
        <header className="bg-blue-700 text-white p-8 md:p-12 print:bg-white print:text-black">
          <h1 className="text-4xl md:text-5xl font-bold">{resumeData.name}</h1>
          <h2 className="text-2xl md:text-3xl font-light text-blue-100 print:text-gray-700">
            {resumeData.title}
          </h2>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-50 print:text-gray-600">
            <a href={`mailto:${resumeData.email}`} className="hover:underline">
              Email: {resumeData.email}
            </a>
            <a href={`tel:${resumeData.phone}`} className="hover:underline">
              Phone: {resumeData.phone}
            </a>
            <span className="hidden sm:inline">
              Location: {resumeData.location}
            </span>
            <a
              href={`https://${resumeData.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub: {resumeData.github}
            </a>
          </div>
        </header>

        {/* === 메인 컨텐츠 (1단 레이아웃) === */}
        <main className="p-8 md:p-12 space-y-10">
          {/* === 1. 학력 === */}
          <section>
            <SectionTitle>Education</SectionTitle>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {edu.school}
                  </h3>
                  <p className="text-gray-500 text-sm">{edu.period}</p>
                </div>
                <p className="text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </section>

          {/* === 2. 자격증 === */}
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <ul className="space-y-3">
              {resumeData.certifications.map((cert, index) => (
                <li key={index}>
                  <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {cert.issuer} ({cert.date})
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* === 3. 어학 === */}
          <section>
            <SectionTitle>Languages</SectionTitle>
            <ul className="space-y-2">
              {resumeData.languages.map((lang, index) => (
                <li key={index} className="flex justify-between">
                  <span className="font-semibold text-gray-800">
                    {lang.lang}
                  </span>
                  <span className="text-gray-600">{lang.level}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* === 4. 경험 === */}
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-8">
              {resumeData.experiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-bold text-gray-800">
                      {exp.company}
                    </h3>
                    <span className="text-sm font-medium text-gray-500">
                      {exp.period}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">
                    {exp.title}
                  </h4>
                  <ul className="list-disc list-outside ml-5 space-y-1 text-gray-700">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* === 5. 프로젝트 (팀/개인 분리) === */}
          <section>
            <SectionTitle>Projects</SectionTitle>

            {/* --- 팀 프로젝트 --- */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-700 mb-5 border-b pb-2">
                팀 프로젝트
              </h3>
              <div className="space-y-8">
                {resumeData.projects.team.map((proj, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xl font-bold text-gray-800">
                        {proj.name}
                      </h4>
                      {proj.link && (
                        <a
                          href={`${proj.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Link
                        </a>
                      )}
                    </div>
                    <p className="text-gray-700 my-2">{proj.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {proj.stack.split(", ").map((tech) => (
                        <SkillTag key={tech} skill={tech} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- 개인 프로젝트 --- */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-5 border-b pb-2">
                개인 프로젝트
              </h3>
              <div className="space-y-8">
                {resumeData.projects.personal.map((proj, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xl font-bold text-gray-800">
                        {proj.name}
                      </h4>
                      {proj.link && (
                        <a
                          href={`${proj.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Link
                        </a>
                      )}
                    </div>
                    <p className="text-gray-700 my-2">{proj.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {proj.stack.split(", ").map((tech) => (
                        <SkillTag key={tech} skill={tech} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Resume;
