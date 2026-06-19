import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ListItem, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface SortableItemProps {
  item: string;
  prefix?: string;
}

export function SortableItem({ item, prefix }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ListItemButton sx={{ border: '1px solid gray', borderRadius: '5px' }}>
        <ListItemIcon>
          <DragIndicatorIcon />
        </ListItemIcon>
        <ListItemText primary={prefix ? `${prefix} ${item}` : item} />
      </ListItemButton>
    </ListItem>
  );
}

export default SortableItem;
