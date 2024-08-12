// 자리 배치를 정의한 배열
const seatArrangement = [6, 6, 6, 6, 6, 4];

// 시작 번호
const startNumber = 50;
let availableSeats = []; // 남은 좌석들
let availableNumbers = []; // 남은 숫자들

// 초기화 및 자리 생성
function createSeats() {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // 초기화
    availableSeats = []; // 초기화
    availableNumbers = Array.from({ length: 34 }, (_, i) => i + 1); // 1부터 34까지의 숫자 초기화

    let currentNumber = startNumber;

    // 자리 배치 생성
    seatArrangement.forEach((seatCount) => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        for (let i = 0; i < seatCount; i++) {
            const seatElement = document.createElement('div');
            seatElement.classList.add('seat');
            seatElement.dataset.number = currentNumber; // 자리 번호 저장
            seatElement.textContent = ""; // 자리 초기화 시 번호 숨기기
            availableSeats.push(currentNumber); // 사용 가능한 자리로 추가
            rowElement.appendChild(seatElement);
            currentNumber++;
        }

        container.appendChild(rowElement);
    });
}

// 랜덤한 순서로 자리 번호 배정
function assignRandomSeats() {
    availableSeats.forEach((seatNumber) => {
        const seatElement = document.querySelector(`.seat[data-number="${seatNumber}"]`);
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const assignedNumber = availableNumbers.splice(randomIndex, 1)[0]; // 랜덤한 숫자 배정

        seatElement.textContent = assignedNumber; // 자리 번호에 숫자 할당
    });
}

// 여러 자리에 여러 번호를 한 번에 할당하는 함수
function assignMultipleSeats() {
    const seatNumbersInput = document.getElementById('seatNumbers').value;
    const seatValuesInput = document.getElementById('seatValues').value;

    const seatNumbers = seatNumbersInput.split(',').map(num => parseInt(num.trim()));
    const seatValues = seatValuesInput.split(',').map(num => parseInt(num.trim()));

    if (seatNumbers.length !== seatValues.length) {
        alert("자리 번호와 숫자의 개수가 일치하지 않습니다.");
        return;
    }

    seatNumbers.forEach((seatNumber, index) => {
        const seatValue = seatValues[index];

        if (!availableSeats.includes(seatNumber)) {
            alert(`${seatNumber}번 자리는 이미 선택되었습니다.`);
            return;
        }

        if (!availableNumbers.includes(seatValue)) {
            alert(`${seatValue}번 숫자는 이미 선택되었습니다.`);
            return;
        }

        const seatElement = document.querySelector(`.seat[data-number="${seatNumber}"]`);
        seatElement.textContent = seatValue;

        // 할당된 자리와 숫자를 사용 가능한 목록에서 제거
        availableSeats = availableSeats.filter(num => num !== seatNumber);
        availableNumbers = availableNumbers.filter(num => num !== seatValue);
    });
}

// 초기화 기능
function resetSeats() {
    document.querySelectorAll('.seat').forEach(seat => {
        seat.classList.remove('hidden');
        seat.textContent = ""; // 번호를 숨김
    });

    createSeats(); // 다시 초기화
}

// DOM 요소와 이벤트 리스너 설정
document.getElementById('submitMultiple').addEventListener('click', assignMultipleSeats);
document.getElementById('submitRandom').addEventListener('click', assignRandomSeats);
document.getElementById('resetBtn').addEventListener('click', resetSeats);

// 처음 로드 시 자리 생성
createSeats();
