import React from "react";

const Portfolio: React.FC = () => {
  interface Tech {
    name: string;
    description: string;
  }

  interface TechCategory {
    category: string;
    techs: Tech[];
  }

  const techCategories: TechCategory[] = [
    {
      category: "Backend",
      techs: [
        {
          name: "JavaScript",
          description: "ES6+ 문법, 비동기 처리, Node.js 환경",
        },
        {
          name: "TypeScript",
          description: "정적 타이핑, Generics, 인터페이스 활용",
        },
        { name: "Node.js", description: "Express, 서버 로직 구현" },
        {
          name: "NestJS",
          description: "모듈 기반 아키텍처, DI, 마이크로서비스",
        },
        { name: "Spring Boot", description: "REST API 개발, 스프링 시큐리티" },
      ],
    },
    {
      category: "Frontend",
      techs: [
        { name: "Tailwind CSS", description: "유틸리티 클래스 기반 UI 개발" },
      ],
    },
    {
      category: "Infrastructure",
      techs: [
        { name: "MySQL", description: "스키마 설계, 복잡 쿼리 최적화" },
        {
          name: "MongoDB",
          description: "NoSQL 데이터 모델링, Aggregation 프레임워크",
        },
        { name: "Docker", description: "컨테이너 이미지 작성 및 배포" },
        { name: "Kubernetes", description: "클러스터 구성 및 오케스트레이션" },
      ],
    },
    {
      category: "Etc",
      techs: [
        { name: "Git", description: "버전 관리 및 협업 워크플로우" },
        { name: "CI/CD", description: "Jenkins, GitLab CI 파이프라인 구축" },
      ],
    },
  ];
  const certifications: string[] = [
    "정보처리기사 (2024)",
    "AWS Certified Solutions Architect – Associate (2025)",
  ];
  return (
    <>
      <style>{`@media print {
        .page-break { page-break-after: always; }
        .avoid-break { break-inside: avoid; }
      }`}</style>
      <div className="bg-gray-50 text-gray-800 font-inter">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <h1 className="text-4xl font-extrabold text-gray-900">채민관</h1>
            <p className="mt-2 text-xl text-gray-600">Fullstack Developer</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-10 space-y-16">
          {/* About Me */}
          <section id="about" className="py-8">
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">
              사용자의 요구사항과 의사소통을 우선시 하며,
              <br /> 유지 보수와 협업이 쉬운 아키텍처에 대해 고민하는 개발자
              채민관입니다.
            </p>
          </section>

          {/* Internship Experience */}
          <section id="internships" className="py-8">
            <h2 className="text-3xl font-extrabold text-indigo-600">
              Internship Experience
            </h2>
            <p className="text-lg my-6">주식회사 코딧 | 2025.03 ~ 2025.09</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card */}
              <div className="bg-white border-l-4 border-indigo-500 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold mb-3">Backend Intern</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>REST API 설계 및 구현 (NestJS)</li>
                  <li>MySQL 데이터베이스 모델링 & 성능 튜닝</li>
                  <li>신규 기능 개발 및 코드 리뷰 참여</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-green-500 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold mb-3">DevOps Intern</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>CI/CD 파이프라인 구축 (Jenkins, GitLab CI)</li>
                  <li>Docker & Kubernetes 배포 자동화</li>
                  <li>모니터링 및 로깅 설정 (Prometheus, ELK)</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-yellow-500 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold mb-3">
                  Data Eng. Intern
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>로그 데이터 파이프라인 설계 (Kafka, Redis)</li>
                  <li>배치 처리 스크립트 작성 (Python, Airflow)</li>
                  <li>데이터 분석 및 시각화 대시보드 제작</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="py-8">
            <h2 className="text-3xl font-extrabold text-indigo-600">
              Projects
            </h2>
            <p className="text-md text-gray-500 pt-2 pb-8">
              2022.06 ~ 현재 | 백엔드 개발자
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
              <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition min-h-[300px]">
                <h3 className="text-3xl font-semibold mb-4">About</h3>
                <p className="text-gray-700 mb-6">
                  프로젝트에 대한 간략한 설명을 여기에 작성하세요. 어떤 문제를
                  해결하고 어떤 가치를 제공했는지 요약합니다.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-medium text-gray-900">
                      My Contribution
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 mt-1">
                      <li>주요 기여 내용 1</li>
                      <li>주요 기여 내용 2</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gray-900">
                      Tech Stack
                    </h4>
                    <p className="text-gray-700 mt-1">
                      NestJS, TypeScript, MySQL, Redis, AWS
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gray-900">
                      Troubleshooting
                    </h4>
                    <p className="text-gray-700 mt-1">
                      주요 이슈 및 해결 방안에 대한 간단한 설명을 작성하세요.
                    </p>
                  </div>
                </div>
              </div>
              {/* 추가 프로젝트 카드는 동일한 구조로 복제 */}
            </div>
          </section>

          {/* Tech Stack */}
          <section id="tech-stack" className="py-8">
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-6">
              Tech Stack
            </h2>
            <div className="space-y-12">
              {techCategories.map((category) => (
                <div key={category.category}>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {category.techs.map((tech) => (
                      <div
                        key={tech.name}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition min-h-[120px]"
                      >
                        <h4 className="text-xl font-semibold mb-2 text-gray-900">
                          {tech.name}
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {tech.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Certifications */}
          <section id="certifications" className="py-8">
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-6">
              Certifications
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-16">
          <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
            &copy; 2025 채민관. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Portfolio;
