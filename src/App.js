import { useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	function startOver() {
		setActiveIndex(0);
	}
	function takeStepForward() {
		if (activeIndex !== steps.length - 1) {
			setActiveIndex((prev) => prev + 1);
		} else {
			setActiveIndex(0);
		}
	}
	function takeStepBack() {
		if (activeIndex > 0) {
			setActiveIndex((prev) => prev - 1);
		}
	}

	let isOnFirstStep = activeIndex === 0;
	let isOnLastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles["steps-content"]}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{steps[activeIndex].content}
					</div>
					<ul className={styles["steps-list"]}>
						{steps.map((step, index) => {
							let isActive = index === activeIndex;
							let isDone = index <= activeIndex;
							return (
								<li
									className={`${styles["steps-item"]}
										${isActive ? styles.active : ""}
										${isDone ? styles.done : ""}`}
									key={step.id}
								>
									{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
									<button
										className={styles["steps-item-button"]}
										onClick={() => setActiveIndex(index)}
									>
										{index + 1}
									</button>
									{/* При клике на кнопку установка выбранного шага в качестве активного */}
									{step.title}
								</li>
							);
						})}
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
					</ul>
					<div className={styles["buttons-container"]}>
						<button
							className={styles.button}
							onClick={takeStepBack}
							disabled={isOnFirstStep}
						>
							Назад
						</button>

						<button
							className={styles.button}
							onClick={isOnLastStep ? startOver : takeStepForward}
						>
							{isOnLastStep ? "Начать сначала" : "Далее"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
