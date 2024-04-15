import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

import { deleteJob } from '@/actions/job';

interface DeleteJobButtonProps {
  id: string;
}

export default function DeleteJobButton(props: DeleteJobButtonProps) {
  const { id } = props;

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: data => {
      if (!data) {
        toast({
          description: 'Failed to remove job',
        });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      toast({ description: 'The job removed' });
    },
  });

  return (
    <Button
      className='w-20 bg-red-500 hover:bg-red-600 text-white'
      size='sm'
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}>
      {isPending ? 'removing...' : 'remove'}
    </Button>
  );
}
