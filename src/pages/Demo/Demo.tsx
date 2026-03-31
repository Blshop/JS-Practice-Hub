import React from 'react';
import Button from 'components/Button';
import Badge from 'components/Badge';
import Text from 'components/Text';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import Select from 'components/Select';
import ProgressBar from 'components/ProgressBar';
import styles from './Demo.module.scss';
import Loader from 'components/Loader';

const Demo: React.FC = () => {
  return (
    <div className={styles.demo}>
      <div className={styles.demo__section}>
        <Text tag="h2" bold>
          Text Component Demo
        </Text>
        <div className={styles.demo__flexRow}>
          <Text tag="h1">h1 Heading</Text> <Text tag="h2">h2 Heading</Text>
          <Text tag="h4">h4 Heading</Text> <Text tag="h5">h5 Heading</Text>
          <Text tag="h6">h6 Heading</Text> <Text tag="p">Paragraph text</Text>
          <Text tag="div">Div text</Text> <Text tag="span">Span text</Text>
          <Text tag="label">Label text</Text>
        </div>
        <div className={styles.demo__flexRow}>
          <Text tag="h1" muted>
            Muted h1 Heading
          </Text>
          <Text tag="p" muted>
            Muted paragraph text
          </Text>
          <Text tag="span" muted>
            Muted span text
          </Text>
          <Text tag="span" error>
            Error span text
          </Text>
          <Text tag="span" success>
            Success span text
          </Text>
        </div>
        <div className={styles.demo__flexRow}>
          <Text tag="h1" bold>
            Bold h1 Heading
          </Text>
          <Text tag="p" bold>
            Bold paragraph text
          </Text>
          <Text tag="span" bold>
            Bold span text
          </Text>
        </div>
        <div className={styles.demo__flexRow}>
          <Text tag="h1" uppercase>
            Uppercase h1 Heading
          </Text>
          <Text tag="p" uppercase>
            Uppercase paragraph text
          </Text>
          <Text tag="span" uppercase>
            Uppercase span text
          </Text>
        </div>
      </div>
      <div className={styles.demo__section}>
        <Text tag="h2" bold>
          Button Component Demo
        </Text>
        <div className={styles.demo__flexRowSmallGap}>
          <Button size="small">Small</Button> <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
        <div className={styles.demo__flexRowSmallGap}>
          <Button size="small" loading>
            Loading
          </Button>
          <Button size="medium" loading>
            Loading
          </Button>
          <Button size="large" loading>
            Loading
          </Button>
        </div>
        <div className={styles.demo__flexRowSmallGap}>
          <Button variant="primary">Primary</Button> <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button> <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button> <Button variant="info">Info</Button>
          <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className={styles.demo__flexRowSmallGap}>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <Button variant="danger" disabled>
            Disabled
          </Button>
          <Button variant="success" disabled>
            Disabled
          </Button>
          <Button variant="warning" disabled>
            Disabled
          </Button>
          <Button variant="info" disabled>
            Disabled
          </Button>
          <Button variant="light" disabled>
            Disabled
          </Button>
          <Button variant="dark" disabled>
            Disabled
          </Button>
          <Button variant="link" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div className={styles.demo__section}>
        <Text tag="h2" bold>
          Badge Component Demo
        </Text>
        <div className={styles.demo__flexRowSmallGap}>
          <Badge size="small">Small</Badge>
          <Badge size="medium">Medium</Badge>
          <Badge size="large">Large</Badge>
        </div>
        <div className={styles.demo__flexRowSmallGap}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="light">Light</Badge>
          <Badge variant="dark">Dark</Badge>
        </div>
      </div>
      <div className={styles.demo__section}>
        <Text tag="h2" bold>
          Input Component Demo
        </Text>
        <div className={styles.demo__gridInputs}>
          <Input label="Small input" elementSize="small" placeholder="Placeholder..." />
          <Input label="Medium input" elementSize="medium" placeholder="Placeholder..." />
          <Input label="Large input" elementSize="large" placeholder="Placeholder..." />
          <Input label="Error input" error="Error message" placeholder="Placeholder..." />
          <Input label="Success input" placeholder="Placeholder..." success />
          <Input label="Disabled input" placeholder="Placeholder..." disabled />
        </div>
      </div>
      <div className={styles.demo__section}>
        <Text tag="h2" bold>
          Select Component Demo
        </Text>
        <div className={styles.demo__gridInputs}>
          <Select
            label="Small select"
            elementSize="small"
            options={[
              { value: '', label: 'Choose option...' },
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 3' },
            ]}
          />
          <Select
            label="Medium select"
            elementSize="medium"
            options={[
              { value: '', label: 'Choose option...' },
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2 (disabled)', disabled: true },
              { value: '3', label: 'Option 3' },
            ]}
          />
          <Select
            label="Large select"
            elementSize="large"
            options={[
              { value: '', label: 'Choose option...' },
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
              { value: '3', label: 'Option 3' },
            ]}
          />
          <Select
            label="Disabled select"
            disabled
            options={[
              { value: '', label: 'Choose option...' },
              { value: '1', label: 'Option 1' },
            ]}
          />
        </div>
      </div>
      <div className={styles.demo__section}>
        <Text tag="h2" bold>
          Checkbox Component Demo
        </Text>
        <div className={styles.demo__flexRow}>
          <Checkbox label="Small checkbox" elementSize="small" />
          <Checkbox label="Medium checkbox" elementSize="medium" defaultChecked />
          <Checkbox label="Large checkbox" elementSize="large" />
        </div>
        <div className={styles.demo__flexRow}>
          <Checkbox label="Disabled checkbox" disabled />
          <Checkbox label="Disabled checked" defaultChecked disabled />
          <Checkbox label="Error checkbox" error />
          <Checkbox label="Success checkbox" success />
        </div>
      </div>
      <div className={styles.demo__section}>
        <Text tag="h2" bold>
          Radio Component Demo
        </Text>
        <div className={styles.demo__flexRow}>
          <Radio label="Small radio" elementSize="small" name="size" />
          <Radio label="Medium radio" elementSize="medium" name="size" defaultChecked />
          <Radio label="Large radio" elementSize="large" name="size" />
        </div>
        <div className={styles.demo__flexRow}>
          <Radio label="Disabled radio" disabled name="group2" />
          <Radio label="Disabled checked" disabled defaultChecked name="group3" />
          <Radio label="Error radio" error name="group1" />
          <Radio label="Success radio" success name="group4" />
        </div>
      </div>

      <div className={styles.demo__section}>
        <Text tag="h2" bold>
          Progress Bar Component Demo
        </Text>
        <div className={styles.demo__progressContainer}>
          <ProgressBar current={10} total={100} label="Primary" variant="primary" />
          <ProgressBar current={20} total={100} label="Progress without %" showPercentage={false} />
          <ProgressBar current={30} total={100} label="Bottom info" positionInfo="bottom" />
          <ProgressBar current={40} total={100} showPercentage={false} />
          <ProgressBar current={50} total={100} />
          <ProgressBar current={60} total={100} label="Secondary" variant="secondary" />
          <ProgressBar current={70} total={100} label="Success" variant="success" />
          <ProgressBar current={80} total={100} label="Danger" variant="danger" />
          <ProgressBar current={90} total={100} label="Warning" variant="warning" />
          <ProgressBar current={100} total={100} label="Info" variant="info" />
        </div>
      </div>

      <div className={styles.demo__section}>
        <Text tag="h2" bold>
          Loader Component Demo
        </Text>
        <div className={styles.demo__flexRow}>
          <Loader size="small" />
          <Loader size="medium" />
          <Loader size="large" />
        </div>
      </div>
    </div>
  );
};

export default Demo;
