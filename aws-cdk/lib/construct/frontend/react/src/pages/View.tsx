import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecords, updateRecord, getTodayRecord } from '../utils/storage';
import type { Record as BabyRecord } from '../utils/storage';
import '../styles/View.css';

function View() {
  const [records, setRecords] = useState<BabyRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [editingRecord, setEditingRecord] = useState<BabyRecord | null>(null);

  useEffect(() => {
    setRecords(getRecords());
  }, []);

  const selectedRecord = records.find(r => r.date === selectedDate) || {
    date: selectedDate,
    poop: 0,
    pee: 0,
    milk: 0,
  };

  const handleEditChange = (field: 'poop' | 'pee' | 'milk', value: number) => {
    if (editingRecord) {
      setEditingRecord({
        ...editingRecord,
        [field]: Math.max(0, value),
      });
    }
  };

  const handleSave = () => {
    if (editingRecord) {
      updateRecord(editingRecord.date, {
        poop: editingRecord.poop,
        pee: editingRecord.pee,
        milk: editingRecord.milk,
      });
      setRecords(getRecords());
      setEditingRecord(null);
    }
  };

  const handleCancel = () => {
    setEditingRecord(null);
  };

  const startEdit = () => {
    setEditingRecord(selectedRecord);
  };

  return (
    <div className="view-container">
      <header className="header">
        <h1>📅 記録の確認・編集</h1>
      </header>

      <div className="content">
        <div className="date-picker">
          <label htmlFor="date-input">日付を選択：</label>
          <input
            id="date-input"
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setEditingRecord(null);
            }}
          />
        </div>

        {editingRecord ? (
          <div className="edit-form">
            <h2>記録を編集</h2>
            <div className="form-group">
              <label htmlFor="poop-input">💩 うんち</label>
              <input
                id="poop-input"
                type="number"
                min="0"
                value={editingRecord.poop}
                onChange={(e) => handleEditChange('poop', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pee-input">💧 おしっこ</label>
              <input
                id="pee-input"
                type="number"
                min="0"
                value={editingRecord.pee}
                onChange={(e) => handleEditChange('pee', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="milk-input">🥛 ミルク</label>
              <input
                id="milk-input"
                type="number"
                min="0"
                value={editingRecord.milk}
                onChange={(e) => handleEditChange('milk', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="button-group">
              <button className="btn btn-save" onClick={handleSave}>
                💾 保存
              </button>
              <button className="btn btn-cancel" onClick={handleCancel}>
                ❌ キャンセル
              </button>
            </div>
          </div>
        ) : (
          <div className="record-display">
            <h2>
              {new Date(selectedDate).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              の記録
            </h2>
            <div className="records-grid">
              <div className="record-item">
                <span className="emoji">💩</span>
                <span className="label">うんち</span>
                <span className="value">{selectedRecord.poop}</span>
              </div>
              <div className="record-item">
                <span className="emoji">💧</span>
                <span className="label">おしっこ</span>
                <span className="value">{selectedRecord.pee}</span>
              </div>
              <div className="record-item">
                <span className="emoji">🥛</span>
                <span className="label">ミルク</span>
                <span className="value">{selectedRecord.milk}</span>
              </div>
            </div>
            <button className="btn btn-edit" onClick={startEdit}>
              ✏️ 編集
            </button>
          </div>
        )}
      </div>

      <footer className="footer">
        <Link to="/" className="home-link">
          🍼 ホームに戻る
        </Link>
      </footer>
    </div>
  );
}

export default View;
