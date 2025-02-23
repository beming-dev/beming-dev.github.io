import React from "react";

function Self() {
  // 인쇄 버튼 클릭 시 window.print()를 호출하여 브라우저의 인쇄 기능을 실행합니다.
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* 헤더 영역 */}
        <header className="bg-[#FAE100] p-6">
          <h1 className="text-[#371D1E] text-3xl font-bold">자기소개서</h1>
          <p className="text-[#371D1E] mt-2">카카오페이 지원</p>
        </header>

        {/* 본문 영역 */}
        <main className="p-6">
          <section className="relative pl-8">
            {/* 세로 타임라인 선 */}
            <div className="absolute left-4 top-0 w-1 bg-gray-300 h-full"></div>

            {/* 18살 (고2) */}
            <div className="mb-8 relative">
              <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-[#FAE100] border-2 border-white"></div>
              <h3 className="text-xl font-semibold">18살 (고등학교 2학년)</h3>
              <p className="mt-2 text-gray-700">
                고등학교 2학년 때, 빅데이터 전문가라는 직업에 매력을 느껴
                C언어로 프로그래밍 공부를 시작해 본 것이 제 첫 프로그래밍
                경험이었습니다. 당시에는 단순히 입력한 코드가 화면에 나타나는
                것이 신기하고 즐거웠습니다.
              </p>
            </div>

            {/* 19살 (고3) */}
            <div className="mb-8 relative">
              <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-[#FAE100] border-2 border-white"></div>
              <h3 className="text-xl font-semibold">19살 (고등학교 3학년)</h3>
              <p className="mt-2 text-gray-700">
                고등학교 3학년 시절, 프로그래밍 동아리를 직접 만들며 친구들과
                함께 꾸준히 프로그래밍 공부를 했습니다.
              </p>
            </div>

            {/* 20살 (대학교 1학년) */}
            <div className="mb-8 relative">
              <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-[#FAE100] border-2 border-white"></div>
              <h3 className="text-xl font-semibold">20살 (대학교 1학년)</h3>
              <p className="mt-2 text-gray-700">
                그렇게 대학생이 되어 컴퓨터 과학부에 입학했습니다. 대학교에
                진학한 후로는 웹 개발에 관심을 가졌습니다. 내가 치는 코드를
                화면에서 바로 확인할 수 있고, 다른 사람들도 접속할 수 있다는
                것이 점이 신기하고 재밌었습니다. 그렇게 HTML, CSS, Javascript를
                공부하며 다양한 사이트를 따라 만들어 보았고, 자연스레 React.js,
                Next.js와 같은 프레임워크에도 관심을 가졌습니다. 이 과정에서
                디자이너 분과 협업하여 정적인 웹사이트를 몇개 만들어 보기도
                하고, 혼자서도 여러 정적인 사이트들을 제작해 봤습니다.
              </p>
              <a
                className="text-blue-500"
                href="https://beming-dev.github.io/MWM/"
                target="_blank"
                rel="noopener noreferrer"
              >
                site: https://beming-dev.github.io/MWM/
              </a>
              &nbsp; --&nbsp;
              <a
                className="text-blue-500"
                href="http://github.com/beming-dev/MWM"
                target="_blank"
                rel="noopener noreferrer"
              >
                github: https://github.com/beming-dev/MWM
              </a>
              <br />
              <a
                className="text-blue-500"
                href="https://beming-dev.github.io/about-seoul/"
                target="_blank"
                rel="noopener noreferrer"
              >
                site: https://beming-dev.github.io/about-seoul/
              </a>
              &nbsp; --&nbsp;
              <a
                className="text-blue-500"
                href="https://github.com/beming-dev/about-seoul"
                target="_blank"
                rel="noopener noreferrer"
              >
                github: https://github.com/beming-dev/about-seoul
              </a>
            </div>

            {/* 21살 (대학교 2학년) */}
            <div className="mb-8 relative">
              <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-[#FAE100] border-2 border-white"></div>
              <h3 className="text-xl font-semibold">21살 (대학교 2학년)</h3>
              <p className="mt-2 text-gray-700">
                그러면서 점점 동적인 사이트 제작에도 관심을 가졌습니다. 그러기
                위해선 백엔드 기술을 배워야 했고, Javascript를 자주 사용했기에
                자연스레 Express.js를 접하게 되었습니다. 백엔드 기술을 배우면서
                개인프로젝트로 커뮤니티 사이트도 만들어보고, 친구들과 미팅
                사이트, 맛집 지도 사이트 등도 제작해봤습니다.
              </p>
              <a
                className="text-blue-500"
                href="https://github.com/beming-dev/college-of-good-restaurants"
                target="_blank"
                rel="noopener noreferrer"
              >
                github:
                https://github.com/beming-dev/college-of-good-restaurants
              </a>
            </div>

            {/* 22살 (사회복무요원) */}
            <div className="mb-8 relative">
              <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-[#FAE100] border-2 border-white"></div>
              <h3 className="text-xl font-semibold">22살 (사회복무요원)</h3>
              <p className="mt-2 text-gray-700">
                백엔드를 꾸준히 공부하며 특수학교에서 사회복무요원을
                시작했습니다. 처음에는 특수학교에 적응하는 데 어려움을
                느꼈습니다. 하지만 아이들과 지속적으로 소통하며 그들의 마음을
                이해하고 다가가는 법을 배웠습니다.
              </p>
            </div>

            {/* 23살 (사회복무요원) */}
            <div className="mb-8 relative">
              <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-[#FAE100] border-2 border-white"></div>
              <h3 className="text-xl font-semibold">23살 (사회복무요원)</h3>
              <p className="mt-2 text-gray-700">
                참여하고 있던 스터디 동아리의 제안을 받아 About 웹사이트 제작
                프로젝트에 백엔드 개발자로 참여했습니다. 처음에는 단순히 투표
                기능만 있는 사이트였지만, 점차 확장하여 번개 모임, 소모임 기능과
                점수 기능등 다양한 비즈니스 로직을 추가하며 서비스를
                확장해갔습니다.
              </p>
              <a
                className="text-blue-500"
                href="https://github.com/AboutClan/nest-back"
                target="_blank"
                rel="noopener noreferrer"
              >
                github: https://github.com/AboutClan/nest-back
              </a>
              <br />
              <a
                className="text-blue-500"
                href="https://study-about.club"
                target="_blank"
                rel="noopener noreferrer"
              >
                site: https://study-about.club
              </a>
            </div>

            {/* 24살 (대학교 3학년) */}
            <div className="mb-8 relative">
              <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-[#FAE100] border-2 border-white"></div>
              <h3 className="text-xl font-semibold">24살 (대학교 3학년)</h3>
              <p className="mt-2 text-gray-700">
                사회복무요원을 마치고, 네덜란드로 교환학생을 가게 되었습니다.
                다른 나라에서 생활하며, 다양한 사람을 만나고 다양한 문화를
                접하며 시야를 넓혔습니다. 한 학기간 "Becoming the next
                successful online startup"이라는 수업을 들으며, 외국 친구들과
                팀을 만들어 헬스케어 프로토타입을 주제로 서비스 개발의 과정을
                경험했습니다. 외국인들을 직접 만나 인터뷰도 하며 요구사항을
                수집했고, 이를 기반으로 서비스의 프로토타입을 제작했습니다. 낯선
                환경, 다른 문화 사람들과 의사소통을 해 본 경험은 저에게 어디서든
                적응할 수 있는 자신감을 주었고 그만큼 의사소통의 중요성도 배울
                수 있었습니다.
              </p>
              <a
                className="text-blue-500"
                href="https://github.com/Molluskular/molluskular"
                target="_blank"
                rel="noopener noreferrer"
              >
                github: https://github.com/Molluskular/molluskular
              </a>
            </div>

            {/* 25살 (대학교 4학년) */}
            <div className="mb-8 relative">
              <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-[#FAE100] border-2 border-white"></div>
              <h3 className="text-xl font-semibold">25살 (대학교 4학년)</h3>
              <p className="mt-2 text-gray-700">
                About 프로젝트는 장기간 운영되어야 하는 만큼, 단순한 기능 구현을
                넘어 비용 관리, 배포 전략, 코드 퀄리티 등 여러 요소를 꼼꼼하게
                고려해야 했습니다. 이 과정에서 AWS를 활용한 배포 파이프라인
                구성, Nest.js와 Spring 등 다양한 프레임워크의 적용, 그리고 에러
                처리와 로깅 모니터링 등 실무에서 마주하는 복잡한 문제들을 해결해
                나갔습니다. 이러한 경험은 저에게 체계적인 문제 해결 능력과 실제
                운영 환경에서의 개발 역량을 크게 향상시켜주었으며, 한 단계 더
                성장한 개발자로서의 자신감을 심어주었습니다.
              </p>
            </div>

            {/* 26살 (현재) */}
            <div className="mb-8 relative">
              <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-[#FAE100] border-2 border-white"></div>
              <h3 className="text-xl font-semibold">26살 (현재)</h3>
              <p className="mt-2 text-gray-700">
                최근에는 Nest.js로 About 서비스의 개발을 지속적으로 진행하고
                있으며, Spring을 사용하여 주식 거래 시뮬레이션 서비스를 제작하고
                있습니다. 또한, Redis를 공부하고 이를 통해 캐싱과 메시지 큐
                기능을 프로젝트에 점진적으로 적용해보며, 시스템 성능 최적화와
                안정성 향상에 노력하고 있습니다. 앞으로는 MSA와 Kubernetes에
                대한 공부하고, Java 및 Spring 기술도 더 깊이 있게 공부하며
                확장성과 유지보수성이 뛰어난 소프트웨어를 개발할 수 있는 능력을
                갖춘 개발자로 성장하고자 합니다. 지속적인 학습과 실무 경험을
                통해 좋은 개발자가 되어, 기술적 우수성뿐만 아니라 팀워크 그리고
                개발에 대한 종합적인 역량을 강화해 나갈 것입니다
              </p>
            </div>
          </section>
        </main>

        {/* 인쇄 버튼 영역 */}
        <footer className="p-6 text-center">
          <button
            onClick={handlePrint}
            className="print:hidden bg-[#FAE100] hover:bg-blue-700 text-[#371D1E] font-bold py-2 px-4 rounded"
          >
            인쇄하기 (PDF)
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Self;
