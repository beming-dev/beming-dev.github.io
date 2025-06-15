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
        <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
          <section className="py-8 flex items-center gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-indigo-600 mb-2">
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed">
                사용자의 요구사항과 의사소통을 우선시하며,
                <br />
                유지 보수와 협업이 쉬운 아키텍처에 대해 고민하는 개발자
                채민관입니다.
              </p>
            </div>
          </section>

          {/* Internship Experience */}
          <section id="internships" className="py-8">
            <h2 className="text-3xl font-extrabold text-indigo-600">
              Internship Experience
            </h2>
            <p className="text-lg my-6">주식회사 코딧 | 2025.03 ~ 2025.09</p>
            <div className="grid grid-cols-1 gap-8">
              {/* Card */}
              <div className="bg-white border-l-4 border-indigo-500 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold mb-3">Api Server</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>REST API 설계 및 구현</li>
                  <li>MySQL 데이터베이스 모델링 & 성능 튜닝</li>
                  <li>신규 기능 개발 및 코드 리뷰 참여</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-green-500 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold mb-3">DevOps</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>
                    Api 판매를 위해 AWS Gateway 연동, plan설계 및 사용량 추적
                  </li>
                  <li>Container로 배포되던 서비스를 kubernetes로 래핑</li>
                  <li>모니터링 및 로깅 설정 (ELK)</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-yellow-500 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold mb-3">Data Eng.</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>국내외 정부 부처 법령, 의안등 크롤링</li>
                  <li>ElasticSearch 인덱스 설계 및 데이터 인덱싱</li>
                  <li>데이터 분석 및 시각화 대시보드 제작</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="py-8">
            <h2 className="text-4xl font-bold text-indigo-600 mb-6">
              Projects
            </h2>
            <div className="grid grid-cols-1 gap-10 py-4">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transform transition-transform min-h-[320px]">
                <h3 className="text-3xl font-semibold mb-4">About</h3>
                <p className="text-lg text-gray-600 mb-8">
                  2022.06 – Present | 백엔드 개발자
                </p>
                <p className="text-gray-700 mb-6">
                  대학생을 위한 모임 플랫폼 서비스입니다. 스터디, 번개 모임,
                  소모임 등의 기능을 제공하며, Google Analytics 기준 약 400
                  DAU(Daily Active User)를 유지하고 있습니다.
                </p>
                <div className="space-y-2 mb-6">
                  <a
                    href="https://study-about.club/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-500 underline hover:text-blue-700"
                  >
                    사이트: study-about.club (게스트 로그인 가능)
                  </a>
                  <br />
                  <a
                    href="https://github.com/AboutClan/nest-back"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-500 underline hover:text-blue-700"
                  >
                    Backend Repo
                  </a>
                  <br />
                  <a
                    href="https://github.com/AboutClan/About"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-500 underline hover:text-blue-700"
                  >
                    Frontend Repo
                  </a>
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-medium mb-2">
                      My Contribution
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>
                        NestJS로 클린 아키텍처 적용
                        <a
                          href="https://beming-dev.github.io/blog/about/clean/"
                          className="ml-2 text-blue-500 underline hover:text-blue-700"
                        >
                          [블로그]
                        </a>
                      </li>
                      <li>
                        ELK & Filebeat 파이프라인 Docker-Compose 구성
                        <a
                          href="https://beming-dev.github.io/blog/about/elk/"
                          className="ml-2 text-blue-500 underline hover:text-blue-700"
                        >
                          [블로그]
                        </a>
                      </li>
                      <li>AWS CodePipeline 통한 CI/CD 배포</li>
                      <li>
                        DBSCAN 기반 스터디 매칭 알고리즘 구현
                        <a
                          href="https://beming-dev.github.io/blog/about/clustering/"
                          className="ml-2 text-blue-500 underline hover:text-blue-700"
                        >
                          [블로그]
                        </a>
                      </li>
                      <li>
                        Redis 캐싱 및 메시지 큐 활용
                        <a
                          href="https://beming-dev.github.io/blog/about/pubsub/"
                          className="ml-2 text-blue-501 underline hover:text-blue-700"
                        >
                          [블로그]
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Tech Stack</h4>
                    <p className="text-gray-700">
                      NestJS, TypeScript, MySQL, Redis, AWS
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">
                      Troubleshooting
                    </h4>
                    <div className="space-y-6">
                      {[
                        {
                          problem: "서버 예기치 않은 오류 및 중단",
                          solution:
                            "예외 타입 명시 및 전역 예외 처리 정비, ELK 스택 도입을 통한 중앙 로그 관리",
                        },
                        {
                          problem: "초기 페이지 로딩 속도 저하",
                          solution:
                            "불필요한 populate 제거, 인덱싱 최적화, Redis 캐싱 도입 (응답 속도 50% 향상)",
                        },
                        {
                          problem: "Heroku 비용·RAM 이슈",
                          solution:
                            "AWS EC2로 이전 및 Docker CI/CD 구성, 비용 100달러 절감",
                        },
                      ].map(({ problem, solution }) => (
                        <div
                          key={problem}
                          className="bg-white border border-gray-200 rounded-lg shadow p-6 hover:shadow-lg transition"
                        >
                          <div className="flex items-center mb-1">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            <h5 className="font-semibold text-gray-800">
                              Issue
                            </h5>
                          </div>
                          <p className="text-gray-700 mb-4">{problem}</p>
                          <div className="flex items-center mb-1">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            <h5 className="font-semibold text-gray-800">
                              Solution
                            </h5>
                          </div>
                          <p className="text-gray-700">{solution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 py-4">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transform transition-transform min-h-[320px]">
                <h3 className="text-3xl font-semibold mb-4">About</h3>
                <p className="text-lg text-gray-600 mb-8">
                  2022.06 – Present | 백엔드 개발자
                </p>
                <p className="text-gray-700 mb-6">
                  대학생을 위한 모임 플랫폼 서비스입니다. 스터디, 번개 모임,
                  소모임 등의 기능을 제공하며, Google Analytics 기준 약 400
                  DAU(Daily Active User)를 유지하고 있습니다.
                </p>
                <div className="space-y-2 mb-6">
                  <a
                    href="https://study-about.club/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-500 underline hover:text-blue-700"
                  >
                    사이트: study-about.club (게스트 로그인 가능)
                  </a>
                  <br />
                  <a
                    href="https://github.com/AboutClan/nest-back"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-500 underline hover:text-blue-700"
                  >
                    Backend Repo
                  </a>
                  <br />
                  <a
                    href="https://github.com/AboutClan/About"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-500 underline hover:text-blue-700"
                  >
                    Frontend Repo
                  </a>
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-medium mb-2">
                      My Contribution
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>
                        NestJS로 클린 아키텍처 적용
                        <a
                          href="https://beming-dev.github.io/blog/about/clean/"
                          className="ml-2 text-blue-500 underline hover:text-blue-700"
                        >
                          [블로그]
                        </a>
                      </li>
                      <li>
                        ELK & Filebeat 파이프라인 Docker-Compose 구성
                        <a
                          href="https://beming-dev.github.io/blog/about/elk/"
                          className="ml-2 text-blue-500 underline hover:text-blue-700"
                        >
                          [블로그]
                        </a>
                      </li>
                      <li>AWS CodePipeline 통한 CI/CD 배포</li>
                      <li>
                        DBSCAN 기반 스터디 매칭 알고리즘 구현
                        <a
                          href="https://beming-dev.github.io/blog/about/clustering/"
                          className="ml-2 text-blue-500 underline hover:text-blue-700"
                        >
                          [블로그]
                        </a>
                      </li>
                      <li>
                        Redis 캐싱 및 메시지 큐 활용
                        <a
                          href="https://beming-dev.github.io/blog/about/pubsub/"
                          className="ml-2 text-blue-501 underline hover:text-blue-700"
                        >
                          [블로그]
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Tech Stack</h4>
                    <p className="text-gray-700">
                      NestJS, TypeScript, MySQL, Redis, AWS
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">
                      Troubleshooting
                    </h4>
                    <div className="space-y-6">
                      {[
                        {
                          problem: "서버 예기치 않은 오류 및 중단",
                          solution:
                            "예외 타입 명시 및 전역 예외 처리 정비, ELK 스택 도입을 통한 중앙 로그 관리",
                        },
                        {
                          problem: "초기 페이지 로딩 속도 저하",
                          solution:
                            "불필요한 populate 제거, 인덱싱 최적화, Redis 캐싱 도입 (응답 속도 50% 향상)",
                        },
                        {
                          problem: "Heroku 비용·RAM 이슈",
                          solution:
                            "AWS EC2로 이전 및 Docker CI/CD 구성, 비용 100달러 절감",
                        },
                      ].map(({ problem, solution }) => (
                        <div
                          key={problem}
                          className="bg-white border border-gray-200 rounded-lg shadow p-6 hover:shadow-lg transition"
                        >
                          <div className="flex items-center mb-1">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            <h5 className="font-semibold text-gray-800">
                              Issue
                            </h5>
                          </div>
                          <p className="text-gray-700 mb-4">{problem}</p>
                          <div className="flex items-center mb-1">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            <h5 className="font-semibold text-gray-800">
                              Solution
                            </h5>
                          </div>
                          <p className="text-gray-700">{solution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
          {/* Etc Section */}
          <section id="etc" className="py-8">
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-6">
              Etc.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  Certifications
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {certifications.map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  Exchange Program
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  교환학생 프로그램 참여: Entrepreneurship 과정을 수강하고,
                  다양한 국가의 국제 학생들과 협업하며 커뮤니케이션 역량을
                  강화했습니다.
                </p>
              </div>
            </div>
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
