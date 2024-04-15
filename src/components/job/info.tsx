interface JobInfoProps {
  icon: React.ReactNode;
  text: string;
}

export default function JobInfo(props: JobInfoProps) {
  const { icon, text } = props;

  return (
    <div className='flex gap-x-2 items-center'>
      {icon}
      {text}
    </div>
  );
}
