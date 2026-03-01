import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	const moveForward = () => {
		if(isLastStep) {
			setActiveIndex(0);
		} else {
			setActiveIndex(activeIndex + 1);
		}
	}

	const moveBackwards = () => {
		if(!isFirstStep) {
		   setActiveIndex(activeIndex - 1);
		}
	}

	const handleStepClick = (index) => {
		setActiveIndex(index);
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => {
							const stepClasses = [
								styles['steps-item'],
								index <= activeIndex ? styles.done : '',
								index === activeIndex ? styles.active : ''
							].filter(Boolean).join(' ');
							
							return (
								<li key={step.id} className={stepClasses}>
									<button 
										className={styles['steps-item-button']}
										onClick={() => handleStepClick(index)}
									>
										{index + 1}
									</button>
									{step.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button 
							className={styles.button}
							onClick={moveBackwards}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button 
							className={styles.button}
							onClick={moveForward}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
