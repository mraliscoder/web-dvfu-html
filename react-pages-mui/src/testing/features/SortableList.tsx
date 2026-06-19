import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import { SortableItem } from '../components/SortableItem';
import { setDraggedItems } from './quizSlice';
import { RootState } from '../../store';

interface SortableListProps {
  index: number;
  numbered?: boolean;
}

function SortableList({ index, numbered }: SortableListProps) {
  const dispatch = useDispatch();
  const arr = useSelector((state: RootState) => state.quiz.lists[index]);
  const draggedItems = arr || [];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = draggedItems.indexOf(active.id as string);
      const newIndex = draggedItems.indexOf(over.id as string);
      const newList = arrayMove(draggedItems, oldIndex, newIndex);
      dispatch(setDraggedItems({ index, items: newList }));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={draggedItems} strategy={verticalListSortingStrategy}>
        <List>
          {draggedItems.map((item, i) => (
            <SortableItem key={item} item={item} prefix={numbered ? `${i + 1}.` : undefined} />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}

export default SortableList;
