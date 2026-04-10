import type {
    QuizQuestion,
QuizSettings,
TriviaApiQuestion,
TriviaCategory,
} from '../types/trivia';

const BASE_URL = 'https://opentdb.com';

interface CategoriesResponse {
trivia_categories: TriviaCategory[];
}

interface QuestionsResponse {
response_code: number;
results: TriviaApiQuestion[];
}

function decodeText(value: string): string {
  return decodeURIComponent(value);
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export async function fetchCategories(): Promise<TriviaCategory[]> {
  const response = await fetch(`${BASE_URL}/api_category.php`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить категории');
  }

  const data: CategoriesResponse = await response.json();
  return data.trivia_categories;
}

export async function fetchQuestions(settings: QuizSettings): Promise<QuizQuestion[]> {
  const params = new URLSearchParams({
    amount: String(settings.amount),
    encode: 'url3986',
  });

  if (settings.categoryId) {
    params.append('category', String(settings.categoryId));
  }

  if (settings.difficulty) {
    params.append('difficulty', settings.difficulty);
  }

  const response = await fetch(`${BASE_URL}/api.php?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить вопросы');
  }

  const data: QuestionsResponse = await response.json();

  if (data.response_code !== 0 || data.results.length === 0) {
    throw new Error('По выбранным параметрам вопросы не найдены');
  }

  return data.results.map((item, index) => {
    const correctAnswer = decodeText(item.correct_answer);
    const incorrectAnswers = item.incorrect_answers.map(decodeText);
    const options = shuffleArray([correctAnswer, ...incorrectAnswers]);

    return {
      id: `${Date.now()}-${index}`,
      category: decodeText(item.category),
      type: item.type,
      difficulty: item.difficulty,
      question: decodeText(item.question),
      correctAnswer,
      incorrectAnswers,
      options,
    };
  });
}
