import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTodayRecord, incrementCount } from '../utils/storage';
import type { Record as BabyRecord } from '../utils/storage';
import '../styles/Home.css';

function Home() {
  const [record, setRecord] = useState<BabyRecord | null>(null);

  useEffect(() => {
    setRecord(getTodayRecord());
  }, []);

  const handleIncrement = (type: 'poop' | 'pee' | 'milk') => {
    const updated = incrementCount(type);
    setRecord(updated);
  };

  if (!record) return <div>Loading...</div>;

  return (
    <div className="home-container">
      <header className="header">
        <h1>🍼 赤ちゃん健康記録</h1>
        <p className="date">{new Date(record.date).toLocaleDateString('ja-JP')}</p>
      </header>

      <div className="buttons-container">
        <button className="btn btn-poop" onClick={() => handleIncrement('poop')}>
          <span className="emoji">💩</span>
          <span className="label">うんち</span>
          <span className="count">{record.poop}</span>
        </button>

        <button className="btn btn-pee" onClick={() => handleIncrement('pee')}>
          <span className="emoji">💧</span>
          <span className="label">おしっこ</span>
          <span className="count">{record.pee}</span>
        </button>

        <button className="btn btn-milk" onClick={() => handleIncrement('milk')}>
          <span className="emoji">🥛</span>
          <span className="label">ミルク</span>
          <span className="count">{record.milk}</span>
        </button>
      </div>

      <footer className="footer">
        <Link to="/view" className="view-link">
          📅 記録を見る・編集
        </Link>
      </footer>
    </div>
  );
}

export default Home;
