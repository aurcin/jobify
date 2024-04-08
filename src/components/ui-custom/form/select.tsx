import { Control } from 'react-hook-form';

import {
  Select as SelectShadcn,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface SelectProps {
  name: string;
  control: Control<any>;
  items: string[];
  labelText?: string;
}

export default function Select(props: SelectProps) {
  const { name, control, items, labelText = '' } = props;

  const renderOprions = items.map(item => {
    return (
      <SelectItem key={item} value={item}>
        {item}
      </SelectItem>
    );
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='capitalize'>{labelText || name}</FormLabel>

          <SelectShadcn
            onValueChange={field.onChange}
            defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{renderOprions}</SelectContent>
          </SelectShadcn>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
